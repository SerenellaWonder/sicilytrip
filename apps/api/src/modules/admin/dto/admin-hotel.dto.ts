import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class AdminHotelDto {
  @IsString() @IsNotEmpty() name!: string;
  @IsString() @IsNotEmpty() slug!: string;
  @IsString() @IsNotEmpty() destinationId!: string;
  @IsOptional() @IsString() municipalityId?: string;
  @IsOptional() @IsString() shortDescription?: string;
  @IsOptional() @IsString() longDescription?: string;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsNumber() latitude?: number;
  @IsOptional() @IsNumber() longitude?: number;
  @IsOptional() @IsInt() @Min(1) @Max(5) starRating?: number;
  @IsOptional() @IsString() mainImageUrl?: string;
  @IsBoolean() isActive!: boolean;
}
