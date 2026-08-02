import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PartnerSolutionClient {

  private readonly logger = new Logger(PartnerSolutionClient.name);

  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {

    this.baseUrl =
      this.config.get<string>('PARTNERSOLUTION_BASE_URL')!;

    this.apiKey =
      this.config.get<string>('PARTNERSOLUTION_API_KEY')!;
  }

  async get(url: string) {

    const response = await firstValueFrom(

      this.http.get(
        this.baseUrl + url,
        {
          headers: {

            Authorization: `apiKey ${this.apiKey}`,

            Accept: 'application/json',

          },

          timeout: 30000,

        },
      ),

    );

    return response.data;
  }

}