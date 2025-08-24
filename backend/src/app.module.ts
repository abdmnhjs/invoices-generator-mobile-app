import { Module } from '@nestjs/common';
import { InvoicesModule } from './invoices/invoices.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [InvoicesModule, ProductsModule],
})
export class AppModule {}
