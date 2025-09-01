import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import type { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

import { invoiceSchema } from '../../schemas/invoice-schema';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  createInvoice(
    @Body(new ZodValidationPipe(invoiceSchema))
    createInvoiceDto: CreateInvoiceDto,
  ) {
    try {
      return this.invoicesService.createInvoice(createInvoiceDto);
    } catch (error) {
      throw new HttpException(
        'Error creating invoice ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
