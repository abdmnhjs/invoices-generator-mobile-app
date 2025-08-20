-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "SIRET" INTEGER NOT NULL,
    "TVA" DECIMAL(4,2) NOT NULL,
    "DateOfIssue" TIMESTAMP(3) NOT NULL,
    "DueDate" TIMESTAMP(3) NOT NULL,
    "ProductName" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "PricePerUnit" DECIMAL(4,2) NOT NULL,
    "TotalPrice" DECIMAL(4,2) NOT NULL,
    "CustomerName" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
