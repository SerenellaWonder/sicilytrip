CREATE TABLE "HotelPayment" (
    "id" TEXT NOT NULL,
    "preBookSnapshotId" TEXT NOT NULL,
    "stripePaymentIntentId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL,
    "customerEmailHash" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HotelPayment_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "HotelPayment_preBookSnapshotId_key"
ON "HotelPayment"("preBookSnapshotId");

CREATE UNIQUE INDEX "HotelPayment_stripePaymentIntentId_key"
ON "HotelPayment"("stripePaymentIntentId");

CREATE INDEX "HotelPayment_customerEmailHash_idx"
ON "HotelPayment"("customerEmailHash");

CREATE INDEX "HotelPayment_status_idx" ON "HotelPayment"("status");

ALTER TABLE "HotelPayment"
ADD CONSTRAINT "HotelPayment_preBookSnapshotId_fkey"
FOREIGN KEY ("preBookSnapshotId") REFERENCES "HotelPreBookSnapshot"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;
