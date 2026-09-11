import {
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerWishlistItemDto {
  @IsString()
  @MaxLength(120)
  hotelId!: string;

  @IsString()
  @MaxLength(250)
  name!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(250)
  zone?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(5)
  stars?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string;
}

export class SyncCustomerWishlistDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomerWishlistItemDto)
  items!: CustomerWishlistItemDto[];
}
