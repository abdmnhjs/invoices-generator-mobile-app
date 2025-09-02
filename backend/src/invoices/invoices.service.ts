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
           * {
             -webkit-print-color-adjust: exact !important;
             print-color-adjust: exact !important;
           }
           body {
             font-family: 'Poppins', sans-serif;
             color: #000;
             line-height: 1.6;
             margin: 0;
             padding: 20px;
           }
           p {
             margin: 8px 0;
             font-size: 14px;
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
          <p>SIRET No. : ${createInvoiceDto.companySiret}</p>
          <p>${createInvoiceDto.companyAddress}</p>
          <p>${createInvoiceDto.companyZipCode} ${createInvoiceDto.companyCity}</p>
          <p>${createInvoiceDto.companyCountry}</p>
          <p><span style="font-weight: bold;">Date of issue </span>${createInvoiceDto.dateOfIssue}</p>
          <p><span style="font-weight: bold;">Due date </span>${createInvoiceDto.dueDate}</p>
        </div>
        <div>
          <h2>${createInvoiceDto.customerName}</h2>
          <p>${createInvoiceDto.customerAddress}</p>
          <p>${createInvoiceDto.customerEmail}</p>
          <p>VAT No. : ${createInvoiceDto.customerVatNumber}</p>
          <p>${createInvoiceDto.customerPurchaseOrder}</p>
          <p>${createInvoiceDto.customerZipCode} ${createInvoiceDto.customerCity}</p>
          <p>${createInvoiceDto.customerCountry}</p>
        </div>
      </div>
      <br/>
      <table style="width: 100%; border-collapse: collapse;">
                 <tr>
           <th style="background-color: #1B512D !important; color: white !important; padding: 10px; border: 1px solid black;">Product</th>
           <th style="background-color: #1B512D !important; color: white !important; padding: 10px; border: 1px solid black;">Quantity</th>
           <th style="background-color: #1B512D !important; color: white !important; padding: 10px; border: 1px solid black;">Unit Price</th>
           <th style="background-color: #1B512D !important; color: white !important; padding: 10px; border: 1px solid black;">Total</th>
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
          <p style="font-weight: bold; margin-bottom: 8px;">IBAN: ${createInvoiceDto.companyIban}</p>
          <p style="margin-bottom: 8px;">Payment Methods: ${createInvoiceDto.paymentMethods}</p>
        </div>
        <div>
          <p>Total price without VAT : ${createInvoiceDto.totalPriceWithoutVat}</p>
          <p>VAT : ${createInvoiceDto.vatResult}</p>
                     <p style="font-weight: bold; background-color: #1B512D !important; color: white !important; padding: 8px 12px; border-radius: 4px;">Total price with VAT: ${createInvoiceDto.totalPriceWithVat}</p>
        </div>
      </div>
      
      </body>
      </html>
      `;
      // Générer un nom de fichier unique basé sur la date et le nom de l'entreprise
      const fileName = `invoice-${createInvoiceDto.companyName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;
      const filePath = path.join(this.uploadsDirectory, fileName);

      // Lancer le navigateur
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
      const page = await browser.newPage();

      // Activer les styles de fond et les couleurs pour le PDF
      await page.emulateMediaType('screen');

      // Désactiver le cache
      await page.setCacheEnabled(false);

      // Configuration supplémentaire pour forcer le rechargement des ressources
      await page.setExtraHTTPHeaders({
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
      });

      // Définir le contenu HTML et attendre que les polices soient chargées
      await page.setContent(template, {
        waitUntil: ['networkidle0', 'load', 'domcontentloaded'],
      });

      // Attendre plus longtemps pour s'assurer que les polices et les styles sont bien chargés
      await new Promise((resolve) => setTimeout(resolve, 2000));

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
