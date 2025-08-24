import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [ProductsController],
  controllers: [ProductsService],
})
export class ProductsModule {}
