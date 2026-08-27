CREATE TABLE "HotelPreBookSnapshot" (
    "id" TEXT NOT NULL,
    "hotelSearchId" TEXT NOT NULL,
    "providerHotelId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "purchaseToken" TEXT NOT NULL,
    "spui" TEXT NOT NULL,
    "originalCurrency" TEXT NOT NULL,
    "deadlineDate" TEXT NOT NULL,
    "finalPrice" DECIMAL(10,2),
    "providerResponse" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelPreBookSnapshot_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "HotelPreBookSnapshot_hotelSearchId_roomId_key"
ON "HotelPreBookSnapshot"("hotelSearchId", "roomId");

CREATE INDEX "HotelPreBookSnapshot_expiresAt_idx"
ON "HotelPreBookSnapshot"("expiresAt");

ALTER TABLE "HotelPreBookSnapshot"
ADD CONSTRAINT "HotelPreBookSnapshot_hotelSearchId_fkey"
FOREIGN KEY ("hotelSearchId") REFERENCES "HotelSearch"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
