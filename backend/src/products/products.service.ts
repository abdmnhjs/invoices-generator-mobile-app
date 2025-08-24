import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { prisma } from '../../db/prisma';

@Injectable()
export class ProductsService {
  async createProduct(createProductDto: CreateProductDto) {
    try {
      console.log('Creating product with data:', createProductDto);
      // Convertir le prix unitaire en Decimal
      const product = await prisma.product.create({
        data: {
          name: createProductDto.name,
          quantity: createProductDto.quantity,
          unitPrice: createProductDto.unitPrice,
        },
      });
      console.log('Product created:', product);
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
