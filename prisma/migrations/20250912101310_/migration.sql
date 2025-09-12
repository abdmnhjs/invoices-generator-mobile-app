/*
  Warnings:

  - Added the required column `totalPriceWithoutVat` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "totalPriceWithoutVat" DECIMAL(10,2) NOT NULL;
