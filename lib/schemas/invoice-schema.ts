import { z } from "zod";

export const invoiceSchema = z
  .object({
    companyName: z
      .string()
      .min(1, "Company name is required")
      .max(255, "Company name must be less than 255 characters"),
    email: z
      .email("Email format is required")
      .min(1, "Email is required")
      .max(255, "Email must be less than 255 characters"),
    address: z
      .string()
      .min(1, "Address is required")
      .max(500, "Address must be less than 500 characters"),
    siret: z
      .number()
      .min(14, "SIRET must be 14 characters")
      .max(14, "SIRET must be 14 characters"),
    tva: z
      .number()
      .min(0, "TVA cannot be negative")
      .max(100, "TVA cannot exceed 100%"),
    dateOfIssue: z
      .string()
      .min(10, "Date must be in format dd/mm/yyyy")
      .max(10, "Date must be in format dd/mm/yyyy"),
    dueDate: z
      .string()
      .min(10, "Date must be in format dd/mm/yyyy")
      .max(10, "Date must be in format dd/mm/yyyy"),
    productName: z
      .string()
      .min(1, "Product name is required")
      .max(255, "Product name must be less than 255 characters"),
    quantity: z
      .number()
      .min(1, "Quantity must be at least 1")
      .max(999999, "Quantity is too large"),
    pricePerUnit: z
      .number()
      .min(0, "Price cannot be negative")
      .max(999999, "Price is too large"),
    customerName: z
      .string()
      .min(1, "Customer name is required")
      .max(255, "Customer name must be less than 255 characters"),
  })
  .required();
