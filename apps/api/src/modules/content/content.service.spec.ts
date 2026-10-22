import type { Prisma } from '@prisma/client';
import { ContentService } from './content.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('public Journal privacy', () => {
  const prisma = {
    journalArticle: {
      findMany: jest.fn<
        Promise<unknown[]>,
        [Prisma.JournalArticleFindManyArgs]
      >(),
      findFirst: jest.fn<
        Promise<unknown>,
        [Prisma.JournalArticleFindFirstArgs]
      >(),
    },
    journalAuthor: {
      findUnique: jest.fn<
        Promise<unknown>,
        [Prisma.JournalAuthorFindUniqueArgs]
      >(),
    },
  };
  const service = new ContentService(prisma as unknown as PrismaService);
  beforeEach(() => jest.clearAllMocks());

  it('filters drafts from lists and omits provenance and account data', async () => {
    prisma.journalArticle.findMany.mockResolvedValue([]);
    await service.journal();
    const query = prisma.journalArticle.findMany.mock.calls[0][0];
    expect(query.where).toEqual({ isPublished: true });
    expect(query.select).not.toHaveProperty('source');
    expect(query.select?.author).toEqual({
      select: {
        slug: true,
        displayName: true,
      },
    });
  });
  it('does not reveal a draft through its slug', async () => {
    prisma.journalArticle.findFirst.mockResolvedValue(null);
    await expect(service.article('draft')).rejects.toMatchObject({
      status: 404,
    });
    expect(prisma.journalArticle.findFirst.mock.calls[0][0].where).toEqual({
      slug: 'draft',
      isPublished: true,
    });
  });
  it('excludes drafts and operator identities from author pages', async () => {
    prisma.journalAuthor.findUnique.mockResolvedValue({
      slug: 'author',
      articles: [],
    });
    await service.author('author');
    const query = prisma.journalAuthor.findUnique.mock.calls[0][0];
    expect(query.select?.articles).toEqual(
      expect.objectContaining({ where: { isPublished: true } }),
    );
    expect(query.select).not.toHaveProperty('operatorId');
    expect(query.select).not.toHaveProperty('operator');
  });
});
