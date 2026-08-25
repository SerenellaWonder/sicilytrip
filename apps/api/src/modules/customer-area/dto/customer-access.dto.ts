import { IsEmail, IsString, Length } from 'class-validator';

export class RequestCustomerAccessDto {
  @IsEmail()
  email!: string;
}

export class VerifyCustomerAccessDto {
  @IsEmail()
  email!: string;

  @IsString()
  @Length(6, 6)
  code!: string;
}
