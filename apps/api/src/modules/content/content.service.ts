import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ContentService {
  constructor(private readonly prisma: PrismaService) {}

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
