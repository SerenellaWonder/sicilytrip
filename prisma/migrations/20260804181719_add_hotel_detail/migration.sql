-- CreateTable
CREATE TABLE "HotelDetail" (
    "id" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerHotelId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "stars" INTEGER,
    "category" TEXT,
    "zone" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "address" TEXT,
    "photoGallery" JSONB,
    "descriptions" JSONB,
    "facilities" JSONB,
    "payload" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HotelDetail_providerHotelId_key" ON "HotelDetail"("providerHotelId");

-- CreateIndex
CREATE INDEX "HotelDetail_provider_idx" ON "HotelDetail"("provider");
