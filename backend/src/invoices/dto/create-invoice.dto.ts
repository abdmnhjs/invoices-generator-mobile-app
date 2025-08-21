import { z } from 'zod';
import { invoiceSchema } from '../../../../lib/schemas/invoice-schema';

export type CreateInvoiceDto = z.infer<typeof invoiceSchema>;
