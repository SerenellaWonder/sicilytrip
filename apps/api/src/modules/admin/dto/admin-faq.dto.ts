import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class AdminFaqDto {
  @IsString() @MinLength(2) @MaxLength(100) category!: string;
  @IsOptional() @IsString() @MaxLength(100) categoryEn?: string;
  @IsString() @MinLength(5) @MaxLength(250) question!: string;
  @IsOptional() @IsString() @MaxLength(250) questionEn?: string;
  @IsString() @MinLength(10) @MaxLength(3000) answer!: string;
  @IsOptional() @IsString() @MaxLength(3000) answerEn?: string;
  @IsInt() @Min(0) sortOrder!: number;
  @IsBoolean() isPublished!: boolean;
}
