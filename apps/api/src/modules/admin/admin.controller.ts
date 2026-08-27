import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { AdminService } from './admin.service';
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
}
