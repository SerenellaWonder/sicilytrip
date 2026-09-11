ALTER TABLE "Wishlist"
  ALTER COLUMN "userId" DROP NOT NULL,
  ALTER COLUMN "hotelId" DROP NOT NULL,
  ADD COLUMN "customerEmailHash" TEXT,
  ADD COLUMN "providerHotelId" TEXT,
  ADD COLUMN "hotelName" TEXT,
  ADD COLUMN "image" TEXT,
  ADD COLUMN "zone" TEXT,
  ADD COLUMN "stars" INTEGER,
  ADD COLUMN "price" DECIMAL(10,2),
  ADD COLUMN "currency" TEXT;

CREATE UNIQUE INDEX "Wishlist_customerEmailHash_providerHotelId_key"
  ON "Wishlist"("customerEmailHash", "providerHotelId");

CREATE INDEX "Wishlist_customerEmailHash_createdAt_idx"
  ON "Wishlist"("customerEmailHash", "createdAt");
