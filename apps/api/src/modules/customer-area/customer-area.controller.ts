import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
} from '@nestjs/common';

import {
  RequestCustomerAccessDto,
  VerifyCustomerAccessDto,
} from './dto/customer-access.dto';
import { CustomerAreaService } from './customer-area.service';
import { SyncCustomerWishlistDto } from './dto/customer-wishlist.dto';

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

  @Get('wishlist')
  getWishlist(@Headers('authorization') authorization?: string) {
    return this.service.getWishlist(this.bearerToken(authorization));
  }

  @Post('wishlist/sync')
  syncWishlist(
    @Headers('authorization') authorization: string | undefined,
    @Body() dto: SyncCustomerWishlistDto,
  ) {
    return this.service.syncWishlist(
      this.bearerToken(authorization),
      dto.items,
    );
  }

  @Delete('wishlist/:hotelId')
  removeWishlistItem(
    @Headers('authorization') authorization: string | undefined,
    @Param('hotelId') hotelId: string,
  ) {
    return this.service.removeWishlistItem(
      this.bearerToken(authorization),
      hotelId,
    );
  }

  private bearerToken(authorization?: string) {
    return authorization?.startsWith('Bearer ') ? authorization.slice(7) : '';
  }
}
