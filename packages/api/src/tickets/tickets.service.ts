import { Injectable } from "@nestjs/common"
import { CreateTicketInput } from "./dto/create-ticket.input"
import { UpdateTicketInput } from "./dto/update-ticket.input"
import { Ticket, TicketType } from "./entities/ticket.entity"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"
import { UsersService } from "src/users/users.service"

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly TicketRepository: Repository<Ticket>,
    private readonly UsersService: UsersService,
  ) {}

  create(createTicketInput: CreateTicketInput) {
    const ticket = new Ticket()
    ticket.type = createTicketInput.type ?? TicketType.STANDARD
    ticket.isUsed = false
    ticket.startDay = createTicketInput.startDay
    if (ticket.type !== TicketType.YEARPASS) ticket.endDay = ticket.startDay
    if (ticket.type === TicketType.YEARPASS)
      ticket.endDay = createTicketInput.endDay

    ticket.clientId = createTicketInput.clientId ?? null
    // create a barcode based on tickettype, startday and unique id
    console.log(ticket.type)
    console.log(ticket.startDay.toISOString())
    console.log(ticket.id)
    // ticket.barcode =
    //   ticket.type.substring(0, 3) +
    //   " " +
    //   ticket.startDay.toISOString().substring(2, 8) +
    //   " " +
    //   ticket.id.substring(9, 19)
    ticket.barcode = "TYP YYMMDD XXXXX"

    //TODO: decrease ticketType amount

    return this.TicketRepository.save(ticket)
  }

  findAll() {
    return `This action returns all tickets`
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
