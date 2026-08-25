-- CreateEnum
CREATE TYPE "ProviderBookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'UNCERTAIN');

-- CreateTable
CREATE TABLE "ProviderBookingAttempt" (
    "id" TEXT NOT NULL,
    "hotelSearchId" TEXT NOT NULL,
    "providerSearchId" TEXT NOT NULL,
    "providerHotelId" TEXT NOT NULL,
    "giataId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "status" "ProviderBookingStatus" NOT NULL DEFAULT 'PENDING',
    "referenceCode" TEXT,
    "providerError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProviderBookingAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProviderBookingAttempt_providerSearchId_roomId_key" ON "ProviderBookingAttempt"("providerSearchId", "roomId");

-- CreateIndex
CREATE INDEX "ProviderBookingAttempt_hotelSearchId_idx" ON "ProviderBookingAttempt"("hotelSearchId");

-- CreateIndex
CREATE INDEX "ProviderBookingAttempt_referenceCode_idx" ON "ProviderBookingAttempt"("referenceCode");

-- AddForeignKey
ALTER TABLE "ProviderBookingAttempt" ADD CONSTRAINT "ProviderBookingAttempt_hotelSearchId_fkey" FOREIGN KEY ("hotelSearchId") REFERENCES "HotelSearch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
