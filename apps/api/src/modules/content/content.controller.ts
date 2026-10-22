import { Controller, Get, Param } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

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
