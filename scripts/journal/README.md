# Journal import and deployment

The local articles.json file is deliberately excluded from Git and Vercel because the repository is public and the articles are unpublished. Restore it from the prepared import package before running the importer.

The 191 original Italian articles are stored in articles.json with source paragraph references and hashes. Do not rewrite the original bodies or automatically remove duplicate titles. Categories follow the supplied DOCX (154/25/3/7/2); 9 pairs have identical bodies and require editorial review.

## Local verification

Run `node scripts/journal/import.cjs` for validation with no database access.
For a dedicated local PostgreSQL test database, explicitly set JOURNAL_LOCAL_DATABASE_URL and JOURNAL_LOCAL_TEST_CONFIRMED=yes and run `node scripts/journal/import.cjs --apply-local`. The importer accepts only localhost URLs, has no production option and never publishes records. Run Prisma migrations against that same isolated database before importing.

The importer creates a Rosario De Santis author profile and 191 draft articles in one transaction. It preserves raw source dates separately from publication dates. The required excerpt is the first 300 Unicode characters of the original text. Images and biography remain missing. The optional AdminOperator link is not assigned; choose the real editorial account before granting author-specific access. Existing CONTENT_EDITOR permissions remain unchanged.

A second identical import skips all 191 records. Conflicting existing records abort the entire transaction. Do not regenerate stable source keys from a reordered document.

## Application behavior

Public list, detail and author endpoints only return published articles. No source metadata or operator account details are exposed. `/admin` includes author selection, article search, section editing and a private preview without publishing. Public pages retain the three existing editorial stories; their slugs are reserved to prevent an unpublished database record from falling back to a static story.

Public article pages use Italian source text when no English translation exists, clearly indicating that choice. Images are optional. Body whitespace is preserved. The sitemap includes only public records and existing editorial stories.

## Checks on 22 October 2026

- All 18 migrations succeeded on a new isolated PostgreSQL database.
- First import: 191 created; repeat: 0 created, 191 skipped.
- 12 API test suites / 40 tests passed, including public draft privacy.
- API build TypeScript and frontend production build passed.
- ESLint passed on changed frontend/API files.
- HTTP checks passed: anonymous draft 404, protected admin listing, 191 drafts, author page without drafts, exact content after authorized save, no drafts in sitemap.
- Broader API TypeScript check including existing tests reports a pre-existing customer-area.service.spec.ts developmentCode typing issue; production build excludes tests and passes.

No article was imported into the production database. A Vercel deploy applies the additive author/provenance schema migration through the existing API build command; it does not import articles. Do not use the API build command for a dry run: it contains migrate deploy.
