import {
  IsBoolean,
  IsInt,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
export class AdminFaqDto {
  @IsString() @MinLength(2) @MaxLength(100) category!: string;
  @IsString() @MinLength(5) @MaxLength(250) question!: string;
  @IsString() @MinLength(10) @MaxLength(3000) answer!: string;
  @IsInt() @Min(0) sortOrder!: number;
  @IsBoolean() isPublished!: boolean;
}
