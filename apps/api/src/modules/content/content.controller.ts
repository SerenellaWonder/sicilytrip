import { Controller, Get, Param, Res, NotFoundException } from '@nestjs/common';
import type { Response } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(
    private readonly service: ContentService,
    private readonly prisma: PrismaService,
  ) {}

  @Get('journal-images/:id')
  async journalImage(@Param('id') id: string, @Res() response: Response) {
    const image = await this.prisma.journalImage.findUnique({ where: { id } });
    if (!image) throw new NotFoundException('Immagine non trovata');
    response.set({
      'Content-Type': image.mimeType,
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'public, max-age=31536000, immutable',
    });
    response.send(Buffer.from(image.data));
  }

  @Get('journal')
  journal() {
    return this.service.journal();
  }

  @Get('journal/authors/:slug')
  author(@Param('slug') slug: string) {
    return this.service.author(slug);
  }

  @Get('journal/:slug')
  article(@Param('slug') slug: string) {
    return this.service.article(slug);
  }

  @Get('faq')
  faq() {
    return this.service.faq();
  }
}
