import { z } from 'zod';
import { createInvoiceSchema } from '../../../schemas/create-invoice-schema';

export type CreateInvoiceDto = z.infer<typeof createInvoiceSchema>;
