import { Injectable } from '@nestjs/common';

import { PartnerSolutionHotelPreBookService }
from '../../partnersolution/services/hotel-prebook.service';

import { HotelPreBookDto } from '../dto/hotel-prebook.dto';

@Injectable()
export class HotelPreBookService {

  constructor(
    private readonly provider:
      PartnerSolutionHotelPreBookService,
  ) {}

  async preBook(
    dto: HotelPreBookDto,
  ) {

    return this.provider.preBook(
      dto,
    );

  }

}