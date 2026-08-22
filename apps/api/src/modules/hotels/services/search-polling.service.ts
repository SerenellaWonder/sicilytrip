import { Injectable, Logger } from '@nestjs/common';

import { HotelSearchStatus, Prisma } from '@prisma/client';

import { HotelSearchRepository } from '../repositories/hotel-search.repository';

import { HotelSearchResultRepository } from '../repositories/hotel-search-result.repository';

import { HotelResultsService } from './hotel-results.service';
import { PartnerHotelResultDto } from '../../partnersolution/dto/partner-hotel-result.dto';
import { PartnerSearchResultsResponseDto } from '../../partnersolution/dto/partner-search-response.dto';

@Injectable()
export class SearchPollingService {
  private readonly logger = new Logger(SearchPollingService.name);

  /*
   * Indicazioni XML Turismo:
   *
   * - primo poll dopo 1 secondo
   * - poll successivi ogni 1 secondo
   * - massimo 40 secondi
   */

  private readonly timeoutMs = 40000;

  private readonly intervalMs = 1000;

  constructor(
    private readonly resultsService: HotelResultsService,

    private readonly searchRepository: HotelSearchRepository,

    private readonly resultRepository: HotelSearchResultRepository,
  ) {}

  async waitForResults(providerSearchId: string, internalSearchId: string) {
    const startedAt = Date.now();

    let pollNumber = 0;

    let lastResponse: PartnerSearchResultsResponseDto | null = null;

    /*
     * Evita di considerare conclusiva la risposta
     * iniziale completamente vuota:
     *
     * TotFound = 0
     * Results = []
     * Processed = 0
     * ToProcess = 0
     * PendingProcess = 0
     */

    let processingStarted = false;

    this.logger.log('========================================');

    this.logger.log('START HOTEL POLLING');

    this.logger.log(`InternalSearchId: ${internalSearchId}`);

    this.logger.log(`ProviderSearchId: ${providerSearchId}`);

    this.logger.log('Interval: 1000ms | Timeout: 40000ms');

    this.logger.log('========================================');

    await this.searchRepository.updateStatus(
      internalSearchId,
      HotelSearchStatus.RUNNING,
    );

    try {
      /*
       * Il provider richiede esplicitamente
       * 1 secondo di attesa prima del primo
       * GetHotelResults.
       */

      await this.delay(this.intervalMs);

      while (Date.now() - startedAt < this.timeoutMs) {
        pollNumber++;

        this.logger.log(`POLL #${pollNumber}`);

        const response = await this.resultsService.getResults(providerSearchId);

        lastResponse = response;

        const hotels = response.Results ?? [];

        const total = response.TotFound ?? 0;

        const processed = response.Processed ?? 0;

        const toProcess = response.ToProcess ?? 0;

        const pending = response.PendingProcess ?? 0;

        this.logger.log(
          [
            `Results=${hotels.length}`,
            `TotFound=${total}`,
            `Processed=${processed}`,
            `ToProcess=${toProcess}`,
            `Pending=${pending}`,
          ].join(' | '),
        );

        /*
         * ERRORE PROVIDER
         */

        if (response.Error) {
          this.logger.error(`PartnerSolution error: ${response.Error}`);

          await this.searchRepository.updateStatus(
            internalSearchId,
            HotelSearchStatus.FAILED,
          );

          return {
            searchId: internalSearchId,

            providerSearchId,

            status: HotelSearchStatus.FAILED,

            error: response.Error,

            total: hotels.length,

            results: hotels,
          };
        }

        /*
         * Il provider ha iniziato realmente
         * l'elaborazione quando compare almeno
         * un'informazione significativa.
         */

        const hasActivity =
          total > 0 ||
          hotels.length > 0 ||
          processed > 0 ||
          toProcess > 0 ||
          pending > 0;

        if (hasActivity) {
          processingStarted = true;
        }

        /*
         * SEMANTICA OSSERVATA XML TURISMO
         *
         * Processed / ToProcess rappresentano
         * le elaborazioni del provider e NON
         * il numero degli hotel.
         *
         * Esempio reale:
         *
         * TotFound       = 15
         * Results.length = 15
         * Processed      = 3
         * ToProcess      = 3
         * PendingProcess = 0
         *
         * In questo stato la ricerca è terminata.
         */

        const providerCompleted =
          processingStarted &&
          pending === 0 &&
          processed === toProcess &&
          toProcess > 0;

        /*
         * Controllo aggiuntivo sulla consistenza
         * dei risultati ricevuti.
         *
         * Se TotFound è valorizzato, vogliamo
         * avere almeno quel numero di risultati.
         */

        const resultsCompleted = total > 0 && hotels.length >= total;

        const completed = providerCompleted && resultsCompleted;

        this.logger.log(
          [
            `ProcessingStarted=${processingStarted}`,
            `ProviderCompleted=${providerCompleted}`,
            `ResultsCompleted=${resultsCompleted}`,
            `Completed=${completed}`,
          ].join(' | '),
        );

        if (completed) {
          await this.saveResults(internalSearchId, hotels);

          await this.searchRepository.updateStatus(
            internalSearchId,
            HotelSearchStatus.COMPLETED,
          );

          this.logger.log('========================================');

          this.logger.log('HOTEL SEARCH COMPLETED');

          this.logger.log(`Polls: ${pollNumber}`);

          this.logger.log(`Hotels: ${hotels.length}`);

          this.logger.log(`Elapsed: ${Date.now() - startedAt}ms`);

          this.logger.log('========================================');

          return {
            searchId: internalSearchId,

            providerSearchId,

            status: HotelSearchStatus.COMPLETED,

            total: hotels.length,

            results: hotels,
          };
        }

        /*
         * ATTENDI IL POLL SUCCESSIVO
         */

        const elapsed = Date.now() - startedAt;

        const remaining = this.timeoutMs - elapsed;

        if (remaining <= 0) {
          break;
        }

        await this.delay(Math.min(this.intervalMs, remaining));
      }

      /*
       * TIMEOUT
       *
       * Salviamo comunque gli eventuali
       * risultati ricevuti.
       */

      const hotels = lastResponse?.Results ?? [];

      if (hotels.length > 0) {
        await this.saveResults(internalSearchId, hotels);
      }

      await this.searchRepository.updateStatus(
        internalSearchId,
        HotelSearchStatus.FAILED,
      );

      this.logger.warn('========================================');

      this.logger.warn('HOTEL POLLING TIMEOUT');

      this.logger.warn(`ProviderSearchId: ${providerSearchId}`);

      this.logger.warn(`Polls: ${pollNumber}`);

      this.logger.warn(`Hotels received: ${hotels.length}`);

      this.logger.warn(`Elapsed: ${Date.now() - startedAt}ms`);

      this.logger.warn('========================================');

      return {
        searchId: internalSearchId,

        providerSearchId,

        status: HotelSearchStatus.FAILED,

        timeout: true,

        total: hotels.length,

        results: hotels,
      };
    } catch (error) {
      this.logger.error('HOTEL POLLING ERROR');

      this.logger.error(error);

      await this.searchRepository
        .updateStatus(internalSearchId, HotelSearchStatus.FAILED)
        .catch(() => undefined);

      throw error;
    }
  }

  private async saveResults(
    internalSearchId: string,
    hotels: PartnerHotelResultDto[],
  ) {
    this.logger.log(`Saving ${hotels.length} hotel(s)`);

    await this.resultRepository.replaceResults(
      internalSearchId,

      hotels.map((hotel) => ({
        provider: 'PartnerSolution',

        providerHotelId: String(hotel.ID ?? hotel.HotelId ?? ''),

        supplier: hotel.Supplier,

        hotelName: hotel.Name ?? hotel.HotelName ?? '',

        stars: hotel.Category ?? hotel.Stars,

        price: hotel.PriceFrom ?? hotel.Price,

        currency: hotel.Currency,

        payload: hotel as unknown as Prisma.InputJsonValue,
      })),
    );

    this.logger.log(`Saved ${hotels.length} hotel(s)`);
  }

  private delay(milliseconds: number) {
    return new Promise<void>((resolve) => setTimeout(resolve, milliseconds));
  }
}
