import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import type { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

import { invoiceSchema } from '../../../lib/schemas/invoice-schema';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(invoiceSchema))
  createInvoice(@Body() createInvoiceDto: CreateInvoiceDto) {
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
