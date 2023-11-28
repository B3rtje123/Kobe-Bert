import { Injectable } from '@nestjs/common';
import { CreateTicketTypeInput } from './dto/create-ticket-type.input';
import { UpdateTicketTypeInput } from './dto/update-ticket-type.input';

@Injectable()
export class TicketTypeService {
  create(createTicketTypeInput: CreateTicketTypeInput) {
    return 'This action adds a new ticketType';
  }

  findAll() {
    return `This action returns all ticketType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketType`;
  }

  update(id: number, updateTicketTypeInput: UpdateTicketTypeInput) {
    return `This action updates a #${id} ticketType`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketType`;
  }
}
