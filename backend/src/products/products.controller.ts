import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpException,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { productSchema } from '../../schemas/product-schema';
import type { ProductDto } from './dto/product.dto';

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
  createProduct(
    @Body(new ZodValidationPipe(productSchema)) productDto: ProductDto,
  ) {
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
  async updateProduct(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(productSchema)) productDto: ProductDto,
  ) {
    try {
      console.log('Updating product:', productDto);
      const updatedProduct = await this.productsService.updateProduct(
        Number(id),
        productDto,
      );
      return updatedProduct;
    } catch (error) {
      throw new HttpException(
        'Error updating product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      return await this.productsService.deleteProduct(Number(id));
    } catch (error) {
      throw new HttpException(
        'Error deleting product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
