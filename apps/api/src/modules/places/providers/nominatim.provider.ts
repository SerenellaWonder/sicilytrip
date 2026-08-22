import { Injectable } from '@nestjs/common';

import { NominatimClient } from '../client/nominatim.client';
import { Destination } from '../models/destination.model';
import { IPlacesProvider } from '../interfaces/places-provider.interface';
import { DestinationMapper } from '../mappers/destination.mapper';

@Injectable()
export class NominatimProvider implements IPlacesProvider {
  constructor(private readonly client: NominatimClient) {}

  async autocomplete(query: string): Promise<Destination[]> {
    const result = await this.client.search(query);

    return result.map((item) => DestinationMapper.fromNominatim(item));
  }

  details(id: string): Promise<Destination> {
    void id;
    return Promise.reject(new Error('Method not implemented.'));
  }
}
