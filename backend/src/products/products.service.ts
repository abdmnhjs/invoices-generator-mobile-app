import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
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

  async getProductById(id: number) {
    try {
      const product = await prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new HttpException(
          `Product with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return product;
    } catch (error) {
      console.error('Error in service:', error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createProduct(productDto: ProductDto) {
    try {
      const product = await prisma.product.create({
        data: {
          name: productDto.name,
          unitPrice: productDto.unitPrice,
          quantity: productDto.quantity,
          totalPrice: parseFloat(productDto.unitPrice) * productDto.quantity,
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

  async updateProductQuantity(id: number, quantity: number) {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: { quantity: quantity },
      });
      return product;
    } catch (error) {
      console.error('Error in service:', error);
      throw new HttpException(
        'Error updating product quantity: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProduct(id: number, productDto: ProductDto) {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: {
          name: productDto.name,
          unitPrice: productDto.unitPrice,
          quantity: productDto.quantity,
          totalPrice: parseFloat(productDto.unitPrice) * productDto.quantity,
        },
      });
      return product;
    } catch (error) {
      console.error('Error in service:', error);
      throw new HttpException(
        'Error updating product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProduct(id: number) {
    try {
      await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error('Error in service:', error);
      throw new HttpException(
        'Error deleting product: ' +
          (error instanceof Error ? error.message : String(error)),
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
