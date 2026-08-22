import { Injectable } from '@nestjs/common';

import { PartnerSolutionClient } from '../client/partnersolution.client';

@Injectable()
export class PartnerSolutionHotelRoomsService {
  constructor(private readonly client: PartnerSolutionClient) {}

  async rooms(searchId: string, giataId: string) {
    return this.client.get(
      `/api/HotelRooms?SearchId=${encodeURIComponent(
        searchId,
      )}&GiataId=${encodeURIComponent(giataId)}`,
    );
  }
}
