import { z } from 'zod';
import { productSchema } from '../../../../lib/schemas/product-schema';

export type CreateProductDto = z.infer<typeof productSchema>;
