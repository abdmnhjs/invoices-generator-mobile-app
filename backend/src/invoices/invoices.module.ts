import { Module } from '@nestjs/common';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [InvoicesController],
  controllers: [InvoicesService],
})
export class InvoicesModule {}
