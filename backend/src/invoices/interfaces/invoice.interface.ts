export interface Invoice {
  id: string;
  companyName: string;
  email: string;
  address: string;
  SIRET: string;
  TVA: string;
  DateOfIssue: Date;
  DueDate: Date;
  ProductName: string;
  Quantity: number;
  PricePerUnit: number;
  TotalPrice: number;
  CustomerName: string;
}
