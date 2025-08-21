import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoicesService {
  createInvoice(createInvoiceDto: CreateInvoiceDto) {
    try {
      // TODO: Create invoice via markdown qu'on convertira en pdf
      return createInvoiceDto;
    } catch (error) {
      throw new HttpException(
        'Error creating invoice ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
