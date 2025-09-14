import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import * as puppeteer from 'puppeteer';
import * as path from 'path';
import * as fs from 'fs';
import { prisma } from '../../../lib/db/prisma';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Supabase credentials not configured. Please check your .env file.',
  );
}

console.log('Initializing Supabase client with URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
});

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

  async getInvoices() {
    try {
      return await prisma.invoice.findMany({ orderBy: { id: 'desc' } });
    } catch (error) {
      throw new HttpException(
        'Error getting invoices: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteInvoice(id: number) {
    try {
      const invoice = await prisma.invoice.delete({
        where: { id },
      });
      await supabase.storage
        .from('invoices')
        .remove([`private/${invoice.fileName}`]);
      return invoice;
    } catch (error) {
      throw new HttpException(
        'Error deleting invoice: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createInvoice(createInvoiceDto: CreateInvoiceDto) {
    try {
      // Calculer les totaux
      const totals = this.calculateTotals(createInvoiceDto);
      createInvoiceDto = {
        ...createInvoiceDto,
        ...totals,
      };
      console.log('Customer SIRET:', createInvoiceDto.customerSiret);
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

      <h1 style="color: #1B512D !important;">INVOICE</h1>
      <br/>
      <div style="display: flex; justify-content: space-between;">
        <div style="display: flex; flex-direction: column; gap: 8px;">

        <div style="display: flex; flex-direction: column;">
           <h2 style="margin: 0 0 2px 0;">${createInvoiceDto.companyName}</h2>
           <p style="margin: 0;">${createInvoiceDto.companyEmail}</p>
           <p style="margin: 0;">${createInvoiceDto.companyPhoneNumber}</p>
           <p style="margin: 0;">SIRET No. : ${createInvoiceDto.companySiret}</p>
        </div>

                <div style="display: flex; flex-direction: column;">
           <p style="margin: 0;">${createInvoiceDto.companyAddress}</p>
           <p style="margin: 0;">${createInvoiceDto.companyZipCode} ${createInvoiceDto.companyCity}</p>
           <p style="margin: 0;">${createInvoiceDto.companyCountry}</p>
        </div>
         
        <div style="display: flex; flex-direction: column;">
           <p style="margin: 0;"><span style="font-weight: bold;">Date of issue </span>${createInvoiceDto.dateOfIssue}</p>
           <p style="margin: 0;"><span style="font-weight: bold;">Due date </span>${createInvoiceDto.dueDate}</p>
        </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; flex-direction: column;">
            <h2 style="margin: 0 0 2px 0;">${createInvoiceDto.customerName}</h2>
            ${createInvoiceDto.customerSiret ? `<p style="margin: 0;">SIRET No. : ${createInvoiceDto.customerSiret}</p>` : ''}
          </div>

           <div style="display: flex; flex-direction: column;">
            <p style="margin: 0;">${createInvoiceDto.customerAddress}</p>
            <p style="margin: 0;">${createInvoiceDto.customerZipCode} ${createInvoiceDto.customerCity}</p>
            <p style="margin: 0;">${createInvoiceDto.customerCountry}</p>
           </div>

           
        </div>
      </div>
      <br/>
      <table style="width: 100%;">
        <tr>
          <th style="background-color: #1B512D !important; color: white !important; padding: 8px;">Product</th>
          <th style="background-color: #1B512D !important; color: white !important; padding: 8px;">Quantity</th>
          <th style="background-color: #1B512D !important; color: white !important; padding: 8px;">Unit Price</th>
          <th style="background-color: #1B512D !important; color: white !important; padding: 8px;">Total</th>
        </tr>${createInvoiceDto.products
          .map(
            (product, index) => `
        <tr style="background-color: ${index % 2 === 0 ? '#f0f0f0' : '#ffffff'};">
          <td style="padding: 8px;">${product.name}</td>
          <td style="padding: 8px;">${product.quantity}</td>
          <td style="padding: 8px;">${product.unitPrice}</td>
          <td style="padding: 8px;">${Number(product.unitPrice) * product.quantity}</td>
        </tr>`,
          )
          .join('')}
      </table>
      <br/>
      <div style="display: flex; justify-content: space-between;">
        <div>
          ${createInvoiceDto.companyIban ? `<p style="font-weight: bold; margin-bottom: 8px;">IBAN : ${createInvoiceDto.companyIban}</p>` : ''}
          ${createInvoiceDto.companyBic ? `<p style="margin-bottom: 8px;">BIC : ${createInvoiceDto.companyBic}</p>` : ''}
           <p style="margin-bottom: 8px;"><span style="font-weight: bold;">Payment Methods : </span>${createInvoiceDto.paymentMethods}</p>
        </div>
        <table>
          <tr><td style="padding: 8px 12px; background-color: #f0f0f0 !important;">VAT : ${createInvoiceDto.vatResult}</td></tr>
          <tr><td style=" padding: 8px 12px;">Total price without VAT : ${createInvoiceDto.totalPriceWithoutVat}</td></tr>
          <tr><td style="padding: 8px 12px; background-color: #1B512D !important; color: white !important;">Total price with VAT : ${createInvoiceDto.totalPriceWithVat}</td></tr>
        </table>
      </div>

      ${!createInvoiceDto.companyVat ? `<p style="text-align: center; margin-top: 20px; font-size: 10px;">VAT not applicable, art. 293B of the French General Tax Code</p>` : ''}
      
      </body>
      </html>
      `;
      // Générer un nom de fichier unique basé sur la date et le nom de l'entreprise
      const fileName = `invoice-${createInvoiceDto.companyName.replace(/\s+/g, '-')}-${Date.now()}.pdf`;

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

      // Générer le PDF en mémoire
      const pdfBuffer = await page.pdf({
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

      console.log('Attempting to upload PDF to Supabase...');
      console.log('fileName:', fileName);
      console.log('pdfBuffer size:', pdfBuffer.length);

      // Upload le PDF directement vers Supabase
      const { error } = await supabase.storage
        .from('invoices')
        .upload(`private/${fileName}`, pdfBuffer);

      if (error) {
        console.error('Supabase upload error details:', {
          error,
          message: error.message,
          name: error.name,
        });
        throw new Error(`Failed to upload file to Supabase: ${error.message}`);
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('invoices').getPublicUrl(`private/${fileName}`);

      await prisma.invoice.create({
        data: {
          pdfUrl: publicUrl,
          fileName: fileName,
          customerName: createInvoiceDto.customerName,
          totalPriceWithoutVat: createInvoiceDto.totalPriceWithoutVat,
        },
      });

      return {
        fileName: fileName,
      };
    } catch (error: any) {
      throw new HttpException(
        'Error creating invoice: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
