import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import type { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

import { createInvoiceSchema } from '../../schemas/create-invoice-schema';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  async getInvoices() {
    try {
      return this.invoicesService.getInvoices();
    } catch (error) {
      throw new HttpException(
        'Error getting invoices: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: number) {
    try {
      return this.invoicesService.deleteInvoice(Number(id));
    } catch (error) {
      throw new HttpException(
        'Error deleting invoice: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post()
  async createInvoice(
    @Body(new ZodValidationPipe(createInvoiceSchema))
    createInvoiceDto: CreateInvoiceDto,
  ) {
    try {
      const result = await this.invoicesService.createInvoice(createInvoiceDto);
      return {
        message: 'PDF generated and uploaded successfully',
        pdfUrl: result.pdfUrl,
        fileName: result.fileName,
      };
    } catch (error: any) {
      throw new HttpException(
        'Error creating invoice: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
