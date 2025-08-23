import { Product } from "./product";

export type Invoice = {
  id: string;
  // Company information
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  companySiret: number;
  companyPhoneNumber: string;
  companyVatNumber?: string;
  companyVat?: number;
  companyIban?: string;
  companyBic?: string;

  // Dates
  dateOfIssue: Date;
  dueDate: Date;

  // Products
  products: Product[];

  // Pricing
  vatResult?: number;
  totalPriceWithoutVat: number;
  totalPriceWithVat?: number;

  // Customer B2B information
  customerName: string;
  customerAddress: string;
  customerEmail?: string;
  customerVatNumber?: string;
  customerPurchaseOrder?: string;
  customerDeliveryAddress?: string;

  // Payment
  paymentMethods: string;
};
