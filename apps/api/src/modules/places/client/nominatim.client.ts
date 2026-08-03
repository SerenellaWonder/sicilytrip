import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NominatimClient {
  private readonly logger = new Logger(NominatimClient.name);

  private readonly baseUrl =
    'https://nominatim.openstreetmap.org';

  constructor(
    private readonly http: HttpService,
  ) {}

  async search(query: string): Promise<any[]> {

    try {

      const response = await firstValueFrom(

        this.http.get(
          `${this.baseUrl}/search`,
          {
            params: {
              q: query,
              format: 'jsonv2',
              addressdetails: 1,
              limit: 8,
              countrycodes: 'it',
            },

            headers: {
              'User-Agent':
                'SicilyTrip/1.0 contact@sicilytrip.it',
            },

            timeout: 30000,
          },
        ),

      );

      return response.data;

    } catch (error) {

      const err = error as AxiosError;

      this.logger.error(err.message);

      throw new HttpException(
        'Nominatim unavailable',
        HttpStatus.BAD_GATEWAY,
      );

    }

  }

}
