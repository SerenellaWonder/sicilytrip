import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactRequestDto } from './dto/create-contact-request.dto';

@Controller('contact')
export class ContactsController {
  constructor(private readonly service: ContactsService) {}

  @Post()
  create(@Body() dto: CreateContactRequestDto, @Ip() ip: string) {
    return this.service.create(dto, ip || 'unknown');
  }
}
