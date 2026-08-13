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
export class PartnerSolutionClient {

  private readonly logger = new Logger(
    PartnerSolutionClient.name,
  );

  private readonly baseUrl: string;

  private readonly apiKey: string;

  private readonly timeout: number;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {

    this.baseUrl =
      this.config.get<string>(
        'PARTNERSOLUTION_BASE_URL',
      ) ?? '';

    this.apiKey =
      this.config.get<string>(
        'PARTNERSOLUTION_API_KEY',
      ) ?? '';

    this.timeout = Number(
      this.config.get(
        'PARTNERSOLUTION_TIMEOUT',
      ) ?? 30000,
    );

  }

  async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {

    return this.request<T>(
      'GET',
      endpoint,
      undefined,
      config,
    );

  }

  async post<T>(
    endpoint: string,
    body: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {

    return this.request<T>(
      'POST',
      endpoint,
      body,
      config,
    );

  }

  private async request<T>(
    method: 'GET' | 'POST',
    endpoint: string,
    body?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {

    const url = `${this.baseUrl}${endpoint}`;

    this.logger.log('========================================');
    this.logger.log(`${method} ${url}`);

    if (body) {
      this.logger.log('REQUEST BODY');
      this.logger.log(
        JSON.stringify(body, null, 2),
      );
    }

    try {

      const response =
        method === 'GET'
          ? await firstValueFrom(
              this.http.get<T>(
                url,
                {
                  timeout: this.timeout,
                  headers: {
                    Authorization: `apiKey ${this.apiKey}`,
                    Accept: 'application/json',
                  },
                  ...config,
                },
              ),
            )
          : await firstValueFrom(
              this.http.post<T>(
                url,
                body,
                {
                  timeout: this.timeout,
                  headers: {
                    Authorization: `apiKey ${this.apiKey}`,
                    Accept: 'application/json',
                    'Content-Type':
                      'application/json',
                  },
                  ...config,
                },
              ),
            );

      this.logger.log('RESPONSE');

      this.logger.log(
        JSON.stringify(
          response.data,
          null,
          2,
        ),
      );

      this.logger.log('========================================');

      return response.data;

    } catch (error) {

      const err = error as AxiosError;

      this.logger.error('REQUEST ERROR');

      this.logger.error(err.message);

      if (err.response) {

        this.logger.error(
          `STATUS: ${err.response.status}`,
        );

        this.logger.error(
          JSON.stringify(
            err.response.data,
            null,
            2,
          ),
        );

      }

      throw new HttpException(
        err.response?.data ??
          'Partner Solution Error',
        err.response?.status ??
          HttpStatus.BAD_GATEWAY,
      );

    }

  }

}