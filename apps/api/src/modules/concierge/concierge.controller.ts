import { Body, Controller, Post } from '@nestjs/common';
import { ConciergeService } from './concierge.service';
import { ConciergeProfileDto } from './dto/concierge-profile.dto';

@Controller('concierge')
export class ConciergeController {
  constructor(private readonly service: ConciergeService) {}

  @Post('profile')
  saveProfile(@Body() dto: ConciergeProfileDto) {
    return this.service.saveProfile(dto);
  }
}
