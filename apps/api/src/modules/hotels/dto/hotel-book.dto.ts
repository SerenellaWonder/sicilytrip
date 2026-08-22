import { IsString } from 'class-validator';

export class HotelBookDto {
  @IsString()
  bookingToken!: string;
}
