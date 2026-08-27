import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class HotelPaymentIntentDto {
  @IsString()
  @IsNotEmpty()
  preBookId!: string;

  @IsEmail()
  customerEmail!: string;
}
