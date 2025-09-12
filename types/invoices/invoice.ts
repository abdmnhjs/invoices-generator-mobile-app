export type Invoice = {
  id: number;
  pdfUrl: string;
  fileName: string;
  totalPriceWithoutVat: number;
  createdAt: Date;
};
