export type Invoice = {
  id: string;
  companyName: string;
  email: string;
  address: string;
  SIRET: number;
  TVA: number;
  DateOfIssue: Date;
  DueDate: Date;
  ProductName: string;
  Quantity: number;
  PricePerUnit: number;
  TotalPrice: number;
  CustomerName: string;
};
