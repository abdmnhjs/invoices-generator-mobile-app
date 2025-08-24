import {
  Controller,
  Get,
  Post,
  UsePipes,
  Body,
  HttpStatus,
  HttpException,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import type { ProductDto } from './dto/product.dto';
import { productSchema } from '../../schemas/product-schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productsService.getProductById(Number(id));
  }

  @Post()
  createProduct(@Body() productDto: ProductDto) {
    try {
      return this.productsService.createProduct(productDto);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new HttpException(
        'Error creating product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(productSchema))
  updateProduct(@Param('id') id: string, @Body() productDto: ProductDto) {
    return this.productsService.updateProduct(Number(id), productDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      await this.productsService.deleteProduct(Number(id));
    } catch (error) {
      throw new HttpException(
        'Error deleting product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
