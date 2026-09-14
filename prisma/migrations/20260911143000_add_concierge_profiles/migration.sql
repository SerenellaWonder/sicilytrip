CREATE TABLE "ConciergeProfile" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "language" TEXT NOT NULL DEFAULT 'it',
  "destination" TEXT,
  "period" TEXT,
  "guests" INTEGER,
  "duration" INTEGER,
  "interests" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ConciergeProfile_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ConciergeProfile_sessionId_key" ON "ConciergeProfile"("sessionId");
CREATE INDEX "ConciergeProfile_updatedAt_idx" ON "ConciergeProfile"("updatedAt");
CREATE INDEX "ConciergeProfile_destination_idx" ON "ConciergeProfile"("destination");
