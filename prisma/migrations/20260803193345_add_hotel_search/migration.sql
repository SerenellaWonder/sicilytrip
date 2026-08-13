-- CreateEnum
CREATE TYPE "HotelSearchStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED');

-- CreateTable
CREATE TABLE "HotelSearch" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerSearchId" TEXT NOT NULL,
    "destinationId" TEXT,
    "checkIn" TIMESTAMP(3) NOT NULL,
    "checkOut" TIMESTAMP(3) NOT NULL,
    "rooms" JSONB NOT NULL,
    "status" "HotelSearchStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelSearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HotelSearchResult" (
    "id" TEXT NOT NULL,
    "hotelSearchId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerHotelId" TEXT NOT NULL,
    "supplier" TEXT,
    "hotelName" TEXT NOT NULL,
    "stars" INTEGER,
    "price" DECIMAL(10,2),
    "currency" TEXT,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HotelSearchResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotelSearch_providerSearchId_key" ON "HotelSearch"("providerSearchId");

-- CreateIndex
CREATE INDEX "HotelSearchResult_hotelSearchId_idx" ON "HotelSearchResult"("hotelSearchId");

-- CreateIndex
CREATE INDEX "HotelSearchResult_providerHotelId_idx" ON "HotelSearchResult"("providerHotelId");

-- CreateIndex
CREATE INDEX "HotelSearchResult_provider_idx" ON "HotelSearchResult"("provider");

-- AddForeignKey
ALTER TABLE "HotelSearch" ADD CONSTRAINT "HotelSearch_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HotelSearchResult" ADD CONSTRAINT "HotelSearchResult_hotelSearchId_fkey" FOREIGN KEY ("hotelSearchId") REFERENCES "HotelSearch"("id") ON DELETE CASCADE ON UPDATE CASCADE;
