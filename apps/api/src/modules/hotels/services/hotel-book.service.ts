import { Injectable } from '@nestjs/common';

import { PartnerSolutionHotelBookService }
from '../../partnersolution/services/hotel-book.service';

import { HotelBookDto } from '../dto/hotel-book.dto';

@Injectable()
export class HotelBookService {

  constructor(
    private readonly provider:
      PartnerSolutionHotelBookService,
  ) {}

  async book(
    dto: HotelBookDto,
  ) {
    return this.provider.book(
      dto,
    );
  }

}