import { Body, Controller, Get, Headers, Param, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AdminService } from './admin.service';
import { AdminJournalArticleDto } from './dto/admin-journal.dto';
import { AdminFaqDto } from './dto/admin-faq.dto';
import { AdminExperienceDto } from './dto/admin-experience.dto';
import { AdminPackageDto } from './dto/admin-package.dto';
import { AdminDestinationDto } from './dto/admin-destination.dto';
import { AdminHotelDto } from './dto/admin-hotel.dto';
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
  @Get('payments') payments(@Headers('authorization') auth?: string) {
    return this.service.payments(auth);
  }
  @Get('wishlists') wishlists(@Headers('authorization') auth?: string) {
    return this.service.wishlists(auth);
  }
  @Get('experiences') experiences(@Headers('authorization') auth?: string) {
    return this.service.experiences(auth);
  }
  @Post('experiences') createExperience(
    @Headers('authorization') auth: string | undefined,
    @Body() dto: AdminExperienceDto,
  ) {
    return this.service.createExperience(auth, dto);
  }
  @Post('experiences/:id') updateExperience(
    @Headers('authorization') auth: string | undefined,
    @Param('id') id: string,
    @Body() dto: AdminExperienceDto,
  ) {
    return this.service.updateExperience(auth, id, dto);
  }
  @Get('packages') packages(@Headers('authorization') auth?: string) {
    return this.service.packages(auth);
  }
  @Post('packages') createPackage(
    @Headers('authorization') auth: string | undefined,
    @Body() dto: AdminPackageDto,
  ) {
    return this.service.createPackage(auth, dto);
  }
  @Post('packages/:id') updatePackage(
    @Headers('authorization') auth: string | undefined,
    @Param('id') id: string,
    @Body() dto: AdminPackageDto,
  ) {
    return this.service.updatePackage(auth, id, dto);
  }
  @Get('destinations') destinations(@Headers('authorization') auth?: string) {
    return this.service.destinations(auth);
  }
  @Get('municipalities') municipalities(
    @Headers('authorization') auth?: string,
  ) {
    return this.service.municipalities(auth);
  }
  @Post('geography/bootstrap') bootstrapGeography(
    @Headers('authorization') auth?: string,
  ) {
    return this.service.bootstrapGeography(auth);
  }
  @Post('destinations') createDestination(
    @Headers('authorization') auth: string | undefined,
    @Body() dto: AdminDestinationDto,
  ) {
    return this.service.createDestination(auth, dto);
  }
  @Post('destinations/:id') updateDestination(
    @Headers('authorization') auth: string | undefined,
    @Param('id') id: string,
    @Body() dto: AdminDestinationDto,
  ) {
    return this.service.updateDestination(auth, id, dto);
  }
  @Get('hotels') hotels(@Headers('authorization') auth?: string) {
    return this.service.hotels(auth);
  }
  @Post('hotels') createHotel(
    @Headers('authorization') auth: string | undefined,
    @Body() dto: AdminHotelDto,
  ) {
    return this.service.createHotel(auth, dto);
  }
  @Post('hotels/:id') updateHotel(
    @Headers('authorization') auth: string | undefined,
    @Param('id') id: string,
    @Body() dto: AdminHotelDto,
  ) {
    return this.service.updateHotel(auth, id, dto);
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
