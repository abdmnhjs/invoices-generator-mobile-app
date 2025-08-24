import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { CreateProductDto } from './dto/create-product.dto';
import { productSchema } from '../../schemas/product-schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Post()
  @UsePipes(new ZodValidationPipe(productSchema))
  createProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.createProduct(createProductDto);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new HttpException(
        'Error creating product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
