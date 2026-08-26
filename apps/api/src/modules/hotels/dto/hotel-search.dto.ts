import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsInt,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class RoomDto {
  @IsInt()
  @Min(1)
  @Max(6)
  adults!: number;

  @IsInt()
  @Min(0)
  @Max(3)
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
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => RoomDto)
  rooms!: RoomDto[];
}
