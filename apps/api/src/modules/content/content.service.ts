import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

  journal() {
    return this.prisma.journalArticle.findMany({
      where: { isPublished: true },
      select: journalSelect,
      orderBy: [{ publishedAt: 'desc' }, { id: 'asc' }],
    });
  }

  async article(slug: string) {
    const article = await this.prisma.journalArticle.findFirst({
      where: { slug, isPublished: true },
      select: journalSelect,
    });
    if (!article) throw new NotFoundException('Articolo non disponibile');
    return article;
  }

  async author(slug: string) {
    const author = await this.prisma.journalAuthor.findUnique({
      where: { slug },
      select: {
        slug: true,
        displayName: true,
        bio: true,
        articles: {
          where: { isPublished: true },
          select: journalSelect,
          orderBy: { publishedAt: 'desc' },
        },
      },
    });
    if (!author) throw new NotFoundException('Autore non disponibile');
    return author;
  }

  faq() {
    return this.prisma.faqItem.findMany({
      where: { isPublished: true },
      select: {
        id: true,
        category: true,
        categoryEn: true,
        question: true,
        questionEn: true,
        answer: true,
        answerEn: true,
        sortOrder: true,
      },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    });
  }
}

const journalSelect = {
  slug: true,
  title: true,
  subtitle: true,
  excerpt: true,
  category: true,
  image: true,
  imageAlt: true,
  content: true,
  readingTime: true,
  publishedAt: true,
  author: { select: { slug: true, displayName: true } },
} as const;
