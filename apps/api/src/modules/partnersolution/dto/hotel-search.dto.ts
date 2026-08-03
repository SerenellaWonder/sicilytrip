import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

export class HotelRoomDto {
  @IsInt()
  Adults!: number;

  @IsInt()
  Children!: number;

  @IsOptional()
  @IsInt()
  Age1?: number;

  @IsOptional()
  @IsInt()
  Age2?: number;

  @IsOptional()
  @IsInt()
  Age3?: number;
}

export class HotelSearchDto {
  @IsString()
  GiataId!: string;

  @IsString()
  NorthEast!: string;

  @IsString()
  SouthWest!: string;

  @IsString()
  PlaceId!: string;

  @IsString()
  CheckIn!: string;

  @IsString()
  CheckOut!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HotelRoomDto)
  Rooms!: HotelRoomDto[];

  @IsArray()
  @IsString({ each: true })
  Suppliers!: string[];
}