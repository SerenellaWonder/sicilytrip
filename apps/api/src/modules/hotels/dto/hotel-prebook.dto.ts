import { IsString } from 'class-validator';

export class HotelPreBookDto {
  @IsString()
  searchId!: string;

  @IsString()
  hotelId!: string;

  @IsString()
  rateId!: string;
}
