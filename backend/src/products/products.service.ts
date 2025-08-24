import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { prisma } from '../../../lib/db/prisma';

@Injectable()
export class ProductsService {
  async getProducts() {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      console.error('Error in service:', error);
      throw new HttpException(
        'Error fetching products: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async createProduct(createProductDto: CreateProductDto) {
    try {
      const product = await prisma.product.create({
        data: {
          name: createProductDto.name,
          quantity: createProductDto.quantity,
          unitPrice: createProductDto.unitPrice,
        },
      });
      return product;
    } catch (error) {
      console.error('Error in service:', error);
      throw new HttpException(
        'Error creating product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
