import { Injectable } from '@nestjs/common';

import {
  IPlacesProvider,
  PlaceSuggestion,
  PlaceDetails,
} from '../interfaces/places-provider.interface';

import { NominatimClient } from '../client/nominatim.client';

@Injectable()
export class NominatimProvider
  implements IPlacesProvider
{
  constructor(
    private readonly client: NominatimClient,
  ) {}

  async autocomplete(
    query: string,
  ): Promise<PlaceSuggestion[]> {

    const result =
      await this.client.search(query);

    return result.map((item: any) => ({

      id: item.place_id,

      label: item.name ?? item.display_name,

      description: item.display_name,

    }));

  }

  async details(
    id: string,
  ): Promise<PlaceDetails> {

    throw new Error(
      'Not implemented yet',
    );

  }

}
