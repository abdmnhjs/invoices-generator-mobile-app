import { z } from 'zod';
import { productSchema } from './product-schema';

export const createInvoiceSchema = z.object({
  // Company information
  companyName: z.string().min(1, 'Company name is required'),
  companyEmail: z
    .email('Invalid company email format')
    .min(1, 'Email is required'),
  companyAddress: z.string().min(1, 'Company address is required'),
  companyCity: z.string().min(1, 'Company city is required'),
  companyZipCode: z.string().min(1, 'Company zip code is required'),
  companyCountry: z.string().min(1, 'Company country is required'),
  companySiret: z
    .string()
    .length(14, 'SIRET must be 14 digits')
    .regex(/^\d+$/, 'SIRET must be a number'),
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
  customerSiret: z
    .string()
    .length(14, 'SIRET must be 14 digits')
    .regex(/^\d+$/, 'SIRET must be a number')
    .optional(),
  customerAddress: z.string().min(1, 'Customer address is required'),
  customerCity: z.string().min(1, 'Customer city is required'),
  customerZipCode: z.string().min(1, 'Customer zip code is required'),
  customerCountry: z.string().min(1, 'Customer country is required'),

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
