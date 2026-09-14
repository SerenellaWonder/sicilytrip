import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class ConciergeProfileDto {
  @IsString() @MaxLength(100) sessionId!: string;
  @IsIn(['it', 'en']) language!: string;
  @IsOptional() @IsString() @MaxLength(100) destination?: string;
  @IsOptional() @IsString() @MaxLength(100) period?: string;
  @IsOptional() @IsInt() @Min(1) @Max(30) guests?: number;
  @IsOptional() @IsInt() @Min(1) @Max(90) duration?: number;
  @IsArray() @IsString({ each: true }) interests!: string[];
}
