CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'CONTENT_EDITOR', 'CUSTOMER_SUPPORT');

CREATE TABLE "AdminOperator" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminOperator_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "AdminOperator_email_key" ON "AdminOperator"("email");
CREATE INDEX "AdminOperator_role_isActive_idx" ON "AdminOperator"("role", "isActive");
