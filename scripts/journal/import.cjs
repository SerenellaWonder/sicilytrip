// Uses the project's installed Prisma Client; no .env loading, migrations or build.
const fs = require("node:fs");
const path = require("node:path");
const { createRequire } = require("node:module");
const { createHash } = require("node:crypto");
const req = createRequire(
  path.resolve(__dirname, "../../apps/api/package.json"),
);
const {
  validateSync,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsArray,
  IsBoolean,
} = req("class-validator");
class Article {}
// Mirrors the constraints read in admin-journal.dto.ts; actual DTO comparison tested separately.
for (const key of ["slug", "title", "excerpt", "category", "subtitle"])
  IsString()(Article.prototype, key);
Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)(Article.prototype, "slug");
MinLength(3)(Article.prototype, "title");
MaxLength(160)(Article.prototype, "title");
MinLength(10)(Article.prototype, "excerpt");
MaxLength(500)(Article.prototype, "excerpt");
IsArray()(Article.prototype, "content");
IsBoolean()(Article.prototype, "isPublished");
const source = JSON.parse(
  fs.readFileSync(path.join(__dirname, "articles.json"), "utf8"),
);
const categories = new Map(source.categories.map((c) => [c.key, c.name]));
const records = source.articles.map((a) => ({
  slug: a.slug,
  title: a.title,
  subtitle: "",
  excerpt: Array.from(a.bodyText).slice(0, 300).join(""),
  category: categories.get(a.categoryKey),
  content: [{ title: "", paragraphs: a.bodyParagraphs }],
  isPublished: false,
  sourceKey: a.sourceKey,
  sourceDateRaw: a.sourceDateRaw,
  source: a.source,
}));
const manifest = source.articles;
const canonical = (x) =>
  Array.isArray(x)
    ? x.map(canonical)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.keys(x)
            .sort()
            .map((k) => [k, canonical(x[k])]),
        )
      : x;
const same = (a, b) =>
  JSON.stringify(canonical(a)) === JSON.stringify(canonical(b));
function validate() {
  if (records.length !== 191 || manifest.length !== 191)
    throw Error("Expected 191 articles");
  const seen = new Set();
  records.forEach((a, i) => {
    if (validateSync(Object.assign(new Article(), a)).length)
      throw Error(`DTO constraints: ${a.slug}`);
    if (
      seen.has(a.slug) ||
      a.isPublished !== false ||
      a.slug !== manifest[i].slug
    )
      throw Error("Duplicate slug or invalid draft");
    if (
      a.content.length !== 1 ||
      a.content[0].title !== "" ||
      !a.content[0].paragraphs.every((p) => typeof p === "string")
    )
      throw Error("Invalid body");
    const hash = createHash("sha256")
      .update(a.content[0].paragraphs.join("\n\n"))
      .digest("hex");
    if (hash !== manifest[i].bodySha256)
      throw Error(`Original body changed: ${a.slug}`);
    seen.add(a.slug);
  });
}
async function main() {
  validate();
  if (!process.argv.includes("--apply-local")) {
    console.log(
      JSON.stringify({
        mode: "validation-only",
        articles: records.length,
        bodyHashes: "PASS",
        dtoConstraints: "PASS",
        databaseAccess: false,
      }),
    );
    return;
  }
  // Only an explicitly supplied local test database is accepted. No production option.
  const raw = process.env.JOURNAL_LOCAL_DATABASE_URL;
  if (!raw) throw Error("Explicit JOURNAL_LOCAL_DATABASE_URL required");
  const url = new URL(raw);
  if (
    !["postgres:", "postgresql:"].includes(url.protocol) ||
    !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname) ||
    url.search
  )
    throw Error(
      "Only a local PostgreSQL test database with no URL query is accepted",
    );
  if (process.env.JOURNAL_LOCAL_TEST_CONFIRMED !== "yes")
    throw Error(
      "Confirm dedicated local test database; do not use a production tunnel",
    );
  const { PrismaClient } = req("@prisma/client");
  const prisma = new PrismaClient({ datasources: { db: { url: raw } } });
  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const author = await tx.journalAuthor.upsert({
          where: { slug: "rosario-de-santis" },
          update: {},
          create: {
            slug: "rosario-de-santis",
            displayName: "Rosario De Santis",
          },
        });
        if (author.displayName !== "Rosario De Santis")
          throw Error("Author conflict");
        let created = 0,
          skipped = 0;
        for (const a of records) {
          const old = await tx.journalArticle.findUnique({
            where: { slug: a.slug },
          });
          if (old) {
            if (
              Object.keys(a).some((k) => !same(old[k], a[k])) ||
              old.authorId !== author.id ||
              old.publishedAt !== null ||
              old.image !== null ||
              old.imageAlt !== null ||
              old.readingTime !== null
            )
              throw Error(`Conflict; transaction cancelled: ${a.slug}`);
            skipped++;
            continue;
          }
          await tx.journalArticle.create({
            data: { ...a, authorId: author.id, publishedAt: null },
          });
          created++;
        }
        return { created, skipped };
      },
      { timeout: 120000 },
    );
    console.log(JSON.stringify(result));
  } finally {
    await prisma.$disconnect();
  }
}
main().catch((e) => {
  console.error(e.message.replace(/postgres(?:ql)?:\/\/\S+/g, "[REDACTED]"));
  process.exitCode = 1;
});
