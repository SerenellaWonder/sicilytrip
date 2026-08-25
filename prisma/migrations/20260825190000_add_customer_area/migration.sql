-- AlterTable
ALTER TABLE "ProviderBookingAttempt" ADD COLUMN "customerEmailHash" TEXT;

-- CreateTable
CREATE TABLE "CustomerAccessCode" (
    "id" TEXT NOT NULL,
    "emailHash" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerAccessCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerSession" (
    "id" TEXT NOT NULL,
    "emailHash" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CustomerSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProviderBookingAttempt_customerEmailHash_idx" ON "ProviderBookingAttempt"("customerEmailHash");

-- CreateIndex
CREATE INDEX "CustomerAccessCode_emailHash_createdAt_idx" ON "CustomerAccessCode"("emailHash", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerSession_tokenHash_key" ON "CustomerSession"("tokenHash");

-- CreateIndex
CREATE INDEX "CustomerSession_emailHash_idx" ON "CustomerSession"("emailHash");
