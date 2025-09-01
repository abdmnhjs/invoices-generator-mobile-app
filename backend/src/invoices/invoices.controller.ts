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
  async createInvoice(
    @Body(new ZodValidationPipe(invoiceSchema))
    createInvoiceDto: CreateInvoiceDto,
  ) {
    try {
      const result = await this.invoicesService.createInvoice(createInvoiceDto);
      return {
        message: 'PDF generated successfully',
        filePath: result.filePath,
        fullPath: result.fullPath,
      };
    } catch (error: any) {
      throw new HttpException(
        'Error creating invoice: ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
