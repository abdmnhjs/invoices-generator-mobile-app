import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { prisma } from '@/lib/db/prisma';

@Injectable()
export class ProductsService {
  async createProduct(createProductDto: CreateProductDto) {
    try {
      const product = await prisma.product.create({
        data: createProductDto,
      });
      return product;
    } catch (error) {
      throw new HttpException(
        'Error creating product ' + error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
