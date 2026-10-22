CREATE TABLE "JournalAuthor" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "displayName" TEXT NOT NULL,
  "bio" TEXT,
  "operatorId" TEXT,
  CONSTRAINT "JournalAuthor_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "JournalAuthor_slug_key" ON "JournalAuthor"("slug");
CREATE UNIQUE INDEX "JournalAuthor_operatorId_key" ON "JournalAuthor"("operatorId");
ALTER TABLE "JournalAuthor" ADD CONSTRAINT "JournalAuthor_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "AdminOperator"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "JournalArticle" ADD COLUMN "authorId" TEXT, ADD COLUMN "sourceKey" TEXT, ADD COLUMN "sourceDateRaw" TEXT, ADD COLUMN "source" JSONB;
CREATE UNIQUE INDEX "JournalArticle_sourceKey_key" ON "JournalArticle"("sourceKey");
ALTER TABLE "JournalArticle" ADD CONSTRAINT "JournalArticle_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "JournalAuthor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
