/*
  Warnings:

  - You are about to drop the column `companyAddress` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyBic` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyEmail` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyIban` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyPhoneNumber` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companySiret` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyVat` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `companyVatNumber` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerAddress` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerDeliveryAddress` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerEmail` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerPurchaseOrder` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerVatNumber` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfIssue` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethods` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `totalPriceWithVat` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `totalPriceWithoutVat` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `vatResult` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `_InvoiceToProduct` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pdfUrl` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InvoiceToProduct" DROP CONSTRAINT "_InvoiceToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_InvoiceToProduct" DROP CONSTRAINT "_InvoiceToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "companyAddress",
DROP COLUMN "companyBic",
DROP COLUMN "companyEmail",
DROP COLUMN "companyIban",
DROP COLUMN "companyName",
DROP COLUMN "companyPhoneNumber",
DROP COLUMN "companySiret",
DROP COLUMN "companyVat",
DROP COLUMN "companyVatNumber",
DROP COLUMN "customerAddress",
DROP COLUMN "customerDeliveryAddress",
DROP COLUMN "customerEmail",
DROP COLUMN "customerName",
DROP COLUMN "customerPurchaseOrder",
DROP COLUMN "customerVatNumber",
DROP COLUMN "dateOfIssue",
DROP COLUMN "dueDate",
DROP COLUMN "paymentMethods",
DROP COLUMN "totalPriceWithVat",
DROP COLUMN "totalPriceWithoutVat",
DROP COLUMN "vatResult",
ADD COLUMN     "pdfUrl" TEXT NOT NULL;

-- DropTable
DROP TABLE "_InvoiceToProduct";
