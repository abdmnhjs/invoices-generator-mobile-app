/*
  Warnings:

  - You are about to drop the column `CustomerName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `DateOfIssue` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `DueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `PricePerUnit` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `ProductName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `Quantity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `SIRET` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `TVA` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `TotalPrice` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `companyAddress` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyEmail` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyPhoneNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companySiret` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerAddress` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerEmail` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerSiren` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfIssue` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethods` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPriceWithoutVat` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "CustomerName",
DROP COLUMN "DateOfIssue",
DROP COLUMN "DueDate",
DROP COLUMN "PricePerUnit",
DROP COLUMN "ProductName",
DROP COLUMN "Quantity",
DROP COLUMN "SIRET",
DROP COLUMN "TVA",
DROP COLUMN "TotalPrice",
DROP COLUMN "address",
DROP COLUMN "email",
ADD COLUMN     "companyAddress" TEXT NOT NULL,
ADD COLUMN     "companyBic" TEXT,
ADD COLUMN     "companyEmail" TEXT NOT NULL,
ADD COLUMN     "companyIban" TEXT,
ADD COLUMN     "companyPhoneNumber" INTEGER NOT NULL,
ADD COLUMN     "companySiret" INTEGER NOT NULL,
ADD COLUMN     "companyVat" DECIMAL(4,2),
ADD COLUMN     "companyVatNumber" TEXT,
ADD COLUMN     "customerAddress" TEXT NOT NULL,
ADD COLUMN     "customerDeliveryAddress" TEXT,
ADD COLUMN     "customerEmail" TEXT NOT NULL,
ADD COLUMN     "customerName" TEXT NOT NULL,
ADD COLUMN     "customerPurchaseOrder" TEXT,
ADD COLUMN     "customerSiren" TEXT NOT NULL,
ADD COLUMN     "customerVatNumber" TEXT,
ADD COLUMN     "dateOfIssue" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentMethods" TEXT NOT NULL,
ADD COLUMN     "totalPriceWithVat" DECIMAL(4,2),
ADD COLUMN     "totalPriceWithoutVat" DECIMAL(4,2) NOT NULL,
ADD COLUMN     "vatResult" DECIMAL(4,2);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unitPrice" DECIMAL(4,2) NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_InvoiceToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_InvoiceToProduct_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InvoiceToProduct_B_index" ON "_InvoiceToProduct"("B");

-- AddForeignKey
ALTER TABLE "_InvoiceToProduct" ADD CONSTRAINT "_InvoiceToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToProduct" ADD CONSTRAINT "_InvoiceToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
