import { z } from 'zod';
import { productSchema } from '../../../schemas/product-schema';

export type CreateProductDto = z.infer<typeof productSchema>;
