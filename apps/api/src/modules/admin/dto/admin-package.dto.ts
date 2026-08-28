import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AdminPackageDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  isActive!: boolean;
}
