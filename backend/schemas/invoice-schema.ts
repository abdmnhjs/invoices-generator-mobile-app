import { z } from 'zod';
import { productSchema } from './product-schema';

export const invoiceSchema = z.object({
  // Company information
  companyName: z.string().min(1, 'Company name is required'),
  companyEmail: z
    .email('Invalid company email format')
    .min(1, 'Email is required'),
  companyAddress: z.string().min(1, 'Company address is required'),
  companySiret: z.string().min(14, 'SIRET must be 14 digits'),
  companyPhoneNumber: z.string().min(1, 'Phone number is required'),
  companyVatNumber: z.string().optional(),
  companyVat: z.number().optional(),
  companyIban: z.string().optional(),
  companyBic: z.string().optional(),

  // Dates
  dateOfIssue: z
    .string()
    .min(10, 'Date of issue is required')
    .max(10, 'Date of issue is required'),
  dueDate: z
    .string()
    .min(10, 'Due date is required')
    .max(10, 'Due date is required'),

  // Customer B2B information
  customerName: z.string().min(1, 'Customer name is required'),
  customerAddress: z.string().min(1, 'Customer address is required'),
  customerEmail: z.email('Invalid customer email format').optional(),
  customerVatNumber: z
    .string()
    .min(13, 'VAT number must be 13 digits')
    .max(13, 'VAT number must be 13 digits')
    .regex(
      /^FR\d{11}$/,
      "VAT number must start with 'FR' followed by 11 digits",
    )
    .optional(),
  customerPurchaseOrder: z.string().optional(),

  // Products
  products: z.array(productSchema),

  // Pricing
  vatResult: z.number().optional(),
  totalPriceWithoutVat: z
    .number()
    .min(0, 'Total price without VAT cannot be negative'),
  totalPriceWithVat: z.number().optional(),

  // Payment
  paymentMethods: z.string().min(1, 'Payment method is required'),
});
