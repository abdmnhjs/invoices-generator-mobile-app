import {
  Controller,
  Post,
  UsePipes,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { CreateProductDto } from './dto/create-product.dto';
import { productSchema } from '@/lib/schemas/product-schema';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(productSchema))
  createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.createProduct(createProductDto);
    } catch (error) {
      throw new HttpException(
        'Error creating product ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
