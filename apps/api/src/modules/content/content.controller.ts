import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
  constructor(private readonly service: ContentService) {}

  @Get('faq')
  faq() {
    return this.service.faq();
  }
}
