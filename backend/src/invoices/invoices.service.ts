import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  createInvoice(createInvoiceDto: CreateInvoiceDto) {
    try {
      const template = `
      <html>
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
    } catch (error) {
      throw new HttpException(
        'Error creating invoice ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
