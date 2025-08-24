import { z } from 'zod';
import { productSchema } from '@/backend/schemas/product-schema';

export type CreateProductDto = z.infer<typeof productSchema>;
