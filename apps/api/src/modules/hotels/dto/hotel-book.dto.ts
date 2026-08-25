import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class HotelBookPaxDto {
  @IsString()
  @IsIn(['Mr', 'Mrs'])
  Title!: string;

  @IsString()
  @IsNotEmpty()
  Name!: string;

  @IsString()
  @IsNotEmpty()
  LastName!: string;

  @IsString()
  @IsIn(['Adult', 'Child'])
  Type!: string;

  @IsInt()
  @Min(1)
  AbosultePaxNumber!: number;

  @IsInt()
  @Min(1)
  RelativePaxNumber!: number;
}

export class HotelBookRoomDto {
  @IsInt()
  @Min(1)
  Cam!: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HotelBookPaxDto)
  Paxes!: HotelBookPaxDto[];
}

export class HotelBookDto {
  @IsString()
  @IsNotEmpty()
  searchId!: string;

  @IsString()
  @IsNotEmpty()
  hotelId!: string;

  @IsString()
  @IsNotEmpty()
  rateId!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HotelBookRoomDto)
  Names!: HotelBookRoomDto[];

  // PartnerSolutions richiede questi valori anche quando sono stringhe vuote.
  @IsString()
  PurchaseToken!: string;

  @IsString()
  Spui!: string;

  @IsString()
  OriginalCurrency!: string;

  @IsString()
  DeadlineDate!: string;
}
