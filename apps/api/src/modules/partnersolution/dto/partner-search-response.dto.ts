import { PartnerHotelResultDto } from './partner-hotel-result.dto';

export interface PartnerSearchResponseDto {

  SearchId?: string;

  Error?: string;

}

export interface PartnerSearchResultsResponseDto {

  TotFound?: number;

  Results?: PartnerHotelResultDto[];

  Processed?: number;

  ToProcess?: number;

  PendingProcess?: number;

  Error?: string;

}