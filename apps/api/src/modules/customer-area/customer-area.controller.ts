import { Body, Controller, Get, Headers, Post } from '@nestjs/common';

import {
  RequestCustomerAccessDto,
  VerifyCustomerAccessDto,
} from './dto/customer-access.dto';
import { CustomerAreaService } from './customer-area.service';

@Controller('customer-area')
export class CustomerAreaController {
  constructor(private readonly service: CustomerAreaService) {}

  @Post('request-code')
  requestCode(@Body() dto: RequestCustomerAccessDto) {
    return this.service.requestAccess(dto.email);
  }

  @Post('verify-code')
  verifyCode(@Body() dto: VerifyCustomerAccessDto) {
    return this.service.verifyAccess(dto.email, dto.code);
  }

  @Get('bookings')
  getBookings(@Headers('authorization') authorization?: string) {
    const token = authorization?.startsWith('Bearer ')
      ? authorization.slice(7)
      : '';

    return this.service.getBookings(token);
  }
}
