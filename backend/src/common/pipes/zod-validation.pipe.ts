import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodObject, ZodError } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodObject<any>) {}

  transform(value: unknown) {
    console.log('Validating value:', value);
    try {
      console.log('Schema:', this.schema);
      const parsedValue = this.schema.parse(value);
      console.log('Parsed value:', parsedValue);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException('Validation failed: ' + error.message);
      }
      throw error;
    }
  }
}
