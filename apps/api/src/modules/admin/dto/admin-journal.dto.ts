import {
  IsArray,
  IsObject,
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  IsNotIn,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
class JournalSectionDto {
  @IsString() title!: string;
  @IsArray() @IsString({ each: true }) paragraphs!: string[];
}
export class AdminJournalArticleDto {
  @IsNotIn([
    'taormina-oltre-la-cartolina',
    'una-tavola-mille-sicilie',
    'eolie-mare-incontra-fuoco',
  ])
  @IsString()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  slug!: string;
  @IsOptional() @IsString() authorId?: string;
  @IsString() @MinLength(3) @MaxLength(160) title!: string;
  @IsOptional() @IsString() subtitle?: string;
  @IsString() @MinLength(10) @MaxLength(500) excerpt!: string;
  @IsString() category!: string;
  @IsOptional() @IsString() image?: string;
  @IsOptional() @IsString() imageAlt?: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => JournalSectionDto)
  content!: Array<{ title: string; paragraphs: string[] }>;
  @IsOptional() @IsString() readingTime?: string;
  @IsBoolean() isPublished!: boolean;
}

export class ImportJournalDraftDto extends AdminJournalArticleDto {
  @IsString() @Matches(/^euphoria:[0-9]{3}$/) sourceKey!: string;
  @IsString() sourceDateRaw!: string;
  @IsObject() source!: Record<string, unknown>;
  @IsString() @Matches(/^[a-f0-9]{64}$/) bodySha256!: string;
}
