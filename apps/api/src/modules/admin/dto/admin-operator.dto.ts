import { AdminRole } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdminOperatorDto {
  @IsEmail() email!: string;
  @IsString() @MinLength(10) password!: string;
  @IsEnum(AdminRole) role!: AdminRole;
}

export class UpdateAdminOperatorDto {
  @IsEnum(AdminRole) role!: AdminRole;
  @IsBoolean() isActive!: boolean;
  @IsOptional() @IsString() @MinLength(10) password?: string;
}
