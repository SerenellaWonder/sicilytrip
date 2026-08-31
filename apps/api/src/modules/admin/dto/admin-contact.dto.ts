import { ContactRequestStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateAdminContactDto {
  @IsEnum(ContactRequestStatus) status!: ContactRequestStatus;
}
