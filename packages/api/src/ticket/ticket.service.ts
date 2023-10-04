import { Injectable } from "@nestjs/common"
import { CreateTicketInput } from "./dto/create-ticket.input"
import { UpdateTicketInput } from "./dto/update-ticket.input"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Ticket } from "./entities/ticket.entity"

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  create(createTicketInput: CreateTicketInput) {
    return "This action adds a new ticket"
  }

  findAll() {
    return this.ticketRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`
  }

  update(id: number, updateTicketInput: UpdateTicketInput) {
    return `This action updates a #${id} ticket`
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`
  }
}
