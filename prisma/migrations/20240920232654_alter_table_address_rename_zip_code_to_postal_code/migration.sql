/*
  Warnings:

  - You are about to drop the column `zipCode` on the `Address` table. All the data in the column will be lost.
  - Added the required column `postalCode` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "zipCode",
ADD COLUMN     "postalCode" TEXT NOT NULL;
