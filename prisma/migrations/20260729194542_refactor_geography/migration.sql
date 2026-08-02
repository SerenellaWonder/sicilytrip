/*
  Warnings:

  - You are about to drop the column `published` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Hotel` table. All the data in the column will be lost.
  - You are about to drop the column `isoCode` on the `Region` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[istatCode]` on the table `Municipality` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Region` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `destinationId` to the `Hotel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `istatCode` to the `Municipality` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Region` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "published",
ADD COLUMN     "coverImage" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "seoDescription" TEXT,
ADD COLUMN     "seoTitle" TEXT;

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "city",
DROP COLUMN "region",
ADD COLUMN     "destinationId" TEXT NOT NULL,
ADD COLUMN     "municipalityId" TEXT;

-- AlterTable
ALTER TABLE "Municipality" ADD COLUMN     "istatCode" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT;

-- AlterTable
ALTER TABLE "Region" DROP COLUMN "isoCode",
ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Hotel_destinationId_idx" ON "Hotel"("destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "Municipality_istatCode_key" ON "Municipality"("istatCode");

-- CreateIndex
CREATE UNIQUE INDEX "Region_code_key" ON "Region"("code");

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_municipalityId_fkey" FOREIGN KEY ("municipalityId") REFERENCES "Municipality"("id") ON DELETE SET NULL ON UPDATE CASCADE;
