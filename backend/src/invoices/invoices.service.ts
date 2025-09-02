import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class InvoicesService {
  private readonly uploadsDirectory = path.join(process.cwd(), 'uploads');

  constructor() {
    // Créer le dossier uploads s'il n'existe pas
    if (!fs.existsSync(this.uploadsDirectory)) {
      fs.mkdirSync(this.uploadsDirectory, { recursive: true });
    }
  }

  private calculateTotals(createInvoiceDto: CreateInvoiceDto) {
    // Calculer le total sans TVA
    const totalPriceWithoutVat = createInvoiceDto.products.reduce(
      (total, product) => total + Number(product.unitPrice) * product.quantity,
      0,
    );

    // Calculer la TVA si un taux est spécifié
    const vatResult = createInvoiceDto.companyVat
      ? (totalPriceWithoutVat * createInvoiceDto.companyVat) / 100
      : 0;

    // Calculer le total avec TVA
    const totalPriceWithVat = totalPriceWithoutVat + vatResult;

    return {
      totalPriceWithoutVat,
      vatResult,
      totalPriceWithVat,
    };
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    try {
      // Calculer les totaux
      const totals = this.calculateTotals(createInvoiceDto);
      createInvoiceDto = {
        ...createInvoiceDto,
        ...totals,
      };
      const template = `
      <html>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Poppins', sans-serif;
          }
        </style>
      </head>
      <body>

      <h1>INVOICE</h1>
      <br/>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <h2>${createInvoiceDto.companyName}</h2>
          <p>${createInvoiceDto.companyEmail}</p>
          <p>${createInvoiceDto.companyPhoneNumber}</p>
          <p>SIRET No.: ${createInvoiceDto.companySiret}</p>
          <p>${createInvoiceDto.companyAddress}</p>
          <p><span style="font-weight: bold;">Date of issue </span>${createInvoiceDto.dateOfIssue}</p>
          <p><span style="font-weight: bold;">Due date </span>${createInvoiceDto.dueDate}</p>
        </div>
        <div>
          <h2>${createInvoiceDto.customerName}</h2>
          <p>${createInvoiceDto.customerAddress}</p>
          <p>${createInvoiceDto.customerEmail}</p>
          <p>VAT No.: ${createInvoiceDto.customerVatNumber}</p>
          <p>${createInvoiceDto.customerPurchaseOrder}</p>
        </div>
      </div>
      <br/>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background-color: #1B512D; color: white; font-weight: bold;">
          <th style="border: 1px solid black;">Product</th>
          <th style="border: 1px solid black;">Quantity</th>
          <th style="border: 1px solid black;">Unit Price</th>
          <th style="border: 1px solid black;">Total</th>
        </tr>
        ${createInvoiceDto.products
          .map(
            (product) => `
          <tr style="background-color: #f0f0f0;">
            <td style="border: 1px solid black;">${product.name}</td>
            <td style="border: 1px solid black;">${product.quantity}</td>
            <td style="border: 1px solid black;">${product.unitPrice}</td>
            <td style="border: 1px solid black;">${Number(product.unitPrice) * product.quantity}</td>
          </tr>
        `,
          )
          .join('')}
      </table>
      <br/>
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p> Payment Methods: ${createInvoiceDto.paymentMethods}</p>
        </div>
        <table style="padding: 10px; background-color: #f0f0f0; border-collapse: collapse;">
          <tr>Total price without VAT: ${createInvoiceDto.totalPriceWithoutVat}</tr>
          <tr>VAT: ${createInvoiceDto.vatResult}</tr>
          <tr style="font-weight: bold; background-color: #1B512D; color: white;">Total price with VAT: ${createInvoiceDto.totalPriceWithVat}</tr>
        </table>
      </div>
      
      </body>
      </html>
      `;
      // Générer un nom de fichier unique basé sur la date et le nom de l'entreprise
      const fileName = `invoice-${createInvoiceDto.companyName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      const filePath = path.join(this.uploadsDirectory, fileName);

      // Lancer le navigateur
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();

      // Définir le contenu HTML et attendre que les polices soient chargées
      await page.setContent(template, {
        waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      });

      // Attendre un peu plus pour s'assurer que les polices sont chargées
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Générer le PDF
      await page.pdf({
        path: filePath,
        format: 'A4',
        margin: {
          top: '20px',
          right: '20px',
          bottom: '20px',
          left: '20px',
        },
      });

      // Fermer le navigateur
      await browser.close();

      // Retourner le chemin du fichier
      return {
        filePath: fileName,
        fullPath: filePath,
      };
    } catch (error: any) {
      throw new HttpException(
        'Error creating invoice: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
