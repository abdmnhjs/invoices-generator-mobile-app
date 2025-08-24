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
import type { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    console.log('GET /products/:id - Received request for product ID:', id);
    return this.productsService.getProductById(Number(id));
  }

  @Post()
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

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      await this.productsService.deleteProduct(Number(id));
      return { message: 'Product deleted successfully' };
    } catch (error) {
      throw new HttpException(
        'Error deleting product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() productDto: CreateProductDto,
  ) {
    try {
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
}
