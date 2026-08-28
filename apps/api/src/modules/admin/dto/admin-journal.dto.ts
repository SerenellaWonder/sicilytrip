import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
export class AdminJournalArticleDto {
  @IsString() @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/) slug!: string;
  @IsString() @MinLength(3) @MaxLength(160) title!: string;
  @IsOptional() @IsString() subtitle?: string;
  @IsString() @MinLength(10) @MaxLength(500) excerpt!: string;
  @IsString() category!: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() imageAlt?: string;
  @IsArray() content!: Array<{ title: string; paragraphs: string[] }>;
  @IsOptional() @IsString() readingTime?: string;
  @IsBoolean() isPublished!: boolean;
}
