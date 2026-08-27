import { Type } from 'class-transformer';
import {
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsEmail,
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
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => HotelBookPaxDto)
  Paxes!: HotelBookPaxDto[];
}

export class HotelBookDto {
  @IsEmail()
  customerEmail!: string;

  @IsString()
  @IsNotEmpty()
  searchId!: string;

  @IsString()
  @IsNotEmpty()
  hotelId!: string;

  @IsString()
  @IsNotEmpty()
  rateId!: string;

  @IsString()
  @IsNotEmpty()
  preBookId!: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @ValidateNested({ each: true })
  @Type(() => HotelBookRoomDto)
  Names!: HotelBookRoomDto[];
}
