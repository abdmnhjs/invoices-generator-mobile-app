import { z } from 'zod';
import { productSchema } from '../../../schemas/product-schema';

export type ProductDto = z.infer<typeof productSchema>;
