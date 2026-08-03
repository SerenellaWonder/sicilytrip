import { IsString, MinLength } from 'class-validator';

export class AutocompleteDto {
  @IsString()
  @MinLength(2)
  query!: string;
}