import {
  IsArray,
  IsInt,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RoomDto {

  @IsInt()
  adults!: number;

  @IsInt()
  children!: number;

}

export class HotelSearchDto {

  @IsString()
  placeId!: string;

  @IsString()
  northEast!: string;

  @IsString()
  southWest!: string;

  @IsString()
  checkIn!: string;

  @IsString()
  checkOut!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomDto)
  rooms!: RoomDto[];

}