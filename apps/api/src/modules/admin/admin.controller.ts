import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AdminService } from './admin.service';
import { AdminJournalArticleDto } from './dto/admin-journal.dto';
import { AdminFaqDto } from './dto/admin-faq.dto';
class LoginDto {
  @IsEmail() email!: string;
  @IsString() @IsNotEmpty() password!: string;
}
@Controller('admin')
export class AdminController {
  constructor(private readonly service: AdminService) {}
  @Post('login') login(@Body() dto: LoginDto) {
    return this.service.login(dto.email, dto.password);
  }
  @Get('bookings') bookings(@Headers('authorization') auth?: string) {
    return this.service.bookings(auth);
  }
  @Get('summary') summary(@Headers('authorization') auth?: string) {
    return this.service.summary(auth);
  }
  @Get('customers') customers(@Headers('authorization') auth?: string) {
    return this.service.customers(auth);
  }
  @Get('journal') journal(@Headers('authorization') auth?: string) {
    return this.service.journalArticles(auth);
  }
  @Post('journal') createJournal(
    @Headers('authorization') auth: string | undefined,
    @Body() dto: AdminJournalArticleDto,
  ) {
    return this.service.createJournalArticle(auth, dto);
  }
  @Post('journal/:id') updateJournal(
    @Headers('authorization') auth: string | undefined,
    @Param('id') id: string,
    @Body() dto: AdminJournalArticleDto,
  ) {
    return this.service.updateJournalArticle(auth, id, dto);
  }
  @Get('faq') faq(@Headers('authorization') auth?: string) {
    return this.service.faqItems(auth);
  }
  @Post('faq') createFaq(
    @Headers('authorization') auth: string | undefined,
    @Body() dto: AdminFaqDto,
  ) {
    return this.service.createFaqItem(auth, dto);
  }
  @Post('faq/:id') updateFaq(
    @Headers('authorization') auth: string | undefined,
    @Param('id') id: string,
    @Body() dto: AdminFaqDto,
  ) {
    return this.service.updateFaqItem(auth, id, dto);
  }
}
