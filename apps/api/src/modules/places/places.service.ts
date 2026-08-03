import { Injectable } from '@nestjs/common';

import { GooglePlacesClient } from './client/google-places.client';

@Injectable()
export class PlacesService {
  constructor(
    private readonly google: GooglePlacesClient,
  ) {}

  async autocomplete(query: string) {

    const response = await this.google.post<any>(
      '/places:autocomplete',
      {
        input: query,

        includedRegionCodes: ['it'],

        languageCode: 'it',

        regionCode: 'it',
      },
      {
        headers: {
          'X-Goog-FieldMask':
            'suggestions.placePrediction.placeId,suggestions.placePrediction.text',
        },
      },
    );

    return response.suggestions ?? [];
  }
}