/*
  Warnings:

  - You are about to drop the column `amount` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `reviewComment` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `reviewNote` on the `Purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_productId_fkey";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "amount",
DROP COLUMN "productId",
DROP COLUMN "reviewComment",
DROP COLUMN "reviewNote";

-- CreateTable
CREATE TABLE "PurchaseItem" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "purchaseId" TEXT,

    CONSTRAINT "PurchaseItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseItem" ADD CONSTRAINT "PurchaseItem_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE SET NULL ON UPDATE CASCADE;
