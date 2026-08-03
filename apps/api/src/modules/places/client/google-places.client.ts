import {
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GooglePlacesClient {
  private readonly logger = new Logger(GooglePlacesClient.name);

  private readonly apiKey: string;

  private readonly baseUrl =
    'https://places.googleapis.com/v1';

  constructor(
  private readonly http: HttpService,
  private readonly config: ConfigService,
) {
  this.apiKey =
    this.config.get<string>('GOOGLE_MAPS_API_KEY') ?? '';

  console.log('===========================');
  console.log('GOOGLE_MAPS_API_KEY');
  console.log(this.apiKey);
  console.log('===========================');
}

  async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.http.get<T>(
          this.baseUrl + endpoint,
          {
            timeout: 30000,
            headers: {
              'X-Goog-Api-Key': this.apiKey,
            },
            ...config,
          },
        ),
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      this.logger.error(err.message);

      throw new HttpException(
        err.response?.data ?? 'Google Places Error',
        err.response?.status ?? HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async post<T>(
    endpoint: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.http.post<T>(
          this.baseUrl + endpoint,
          body,
          {
            timeout: 30000,
            headers: {
              'X-Goog-Api-Key': this.apiKey,
              'Content-Type': 'application/json',
            },
            ...config,
          },
        ),
      );

      return response.data;
    } catch (error) {
      const err = error as AxiosError;

      this.logger.error(err.message);

      throw new HttpException(
        err.response?.data ?? 'Google Places Error',
        err.response?.status ?? HttpStatus.BAD_GATEWAY,
      );
    }
  }
  
}