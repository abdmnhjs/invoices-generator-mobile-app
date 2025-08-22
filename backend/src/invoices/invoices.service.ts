import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { customAlphabet } from 'nanoid';

@Injectable()
export class InvoicesService {
  createInvoice(createInvoiceDto: CreateInvoiceDto) {
    try {
      // Génère un ID de 4 caractères avec uniquement des lettres majuscules et des chiffres
      const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 4);
      const invoiceId = nanoid();
      const template = `
      # Invoice I-${invoiceId}
      ## Company informations
      * Company name : **${createInvoiceDto.companyName}**
      * Company email : **${createInvoiceDto.email}**
      * Company address : **${createInvoiceDto.address}**
      * Company SIRET : **${createInvoiceDto.siret}**
      `;
      return createInvoiceDto;
    } catch (error) {
      throw new HttpException(
        'Error creating invoice ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
