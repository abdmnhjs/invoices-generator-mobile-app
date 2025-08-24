import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  unitPrice: z
    .string()
    .refine((val) => /^\d+(\.\d{0,2})?$/.test(val), {
      message: 'Unit price must be a valid decimal with up to 2 decimal places',
    })
    .transform((val) => Number(val)), // Convert to number for Prisma
});
