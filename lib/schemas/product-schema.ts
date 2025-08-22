import { z } from "zod";

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  unitPrice: z.number().min(0, "Unit price cannot be negative"),
  totalPrice: z.number().min(0, "Total price cannot be negative"),
});
