import { Injectable } from "@nestjs/common"
import { CreateTicketInput } from "./dto/create-ticket.input"
import { UpdateTicketInput } from "./dto/update-ticket.input"
import { Ticket, TicketType } from "./entities/ticket.entity"
import { Repository } from "typeorm"
import { ObjectId } from "mongodb"
import { InjectRepository } from "@nestjs/typeorm"
import { UsersService } from "src/users/users.service"

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly TicketRepository: Repository<Ticket>,
    private readonly UsersService: UsersService,
  ) {}

  async create(createTicketInput: CreateTicketInput, userUid: string) {
    const ticket = new Ticket()
    ticket.type = createTicketInput.type ?? TicketType.STANDARD
    ticket.isUsed = false
    ticket.startDay = createTicketInput.startDay
    if (ticket.type !== TicketType.YEARPASS) ticket.endDay = ticket.startDay
    if (ticket.type === TicketType.YEARPASS)
      ticket.endDay = createTicketInput.endDay

    ticket.clientUid = userUid ?? null
    //if useruid is given, find user and add to ticket
    if (ticket.clientUid) {
      const user = await this.UsersService.findOneByUid(ticket.clientUid)
      ticket.client = user
    }

    // create a barcode based on tickettype, startday and amount of tickets of that day
    // ticket.id = new Types.ObjectId().toString()
    const tickets = await this.findByDate(ticket.startDay)
    ticket.barcode =
      ticket.type.substring(0, 3) +
      " " +
      ticket.startDay.toISOString().substring(2, 10).replaceAll("-", "") +
      " " +
      (tickets.length + 1).toString().padStart(6, "0")
    // ticket.barcode = ticket.id

    //TODO: decrease ticketType amount

    return this.TicketRepository.save(ticket)
  }

  findAll(): Promise<Ticket[]> {
    return this.TicketRepository.find()
  }

  findByDate(startDay: Date): Promise<Ticket[]> {
    return this.TicketRepository.find({ where: { startDay } })
  }

  findOneByBarcode(barcode: string): Promise<Ticket> {
    return this.TicketRepository.findOne({ where: { barcode } })
  }

  findOneById(id: string) {
    // @ts-ignore
    return this.TicketRepository.findOne({ _id: new ObjectId(id) })
  }

  findByUid(uid: string) {
    return this.TicketRepository.find({ where: { clientUid: uid } })
  }

  ticketUsed(ticketId: string) {
    return this.TicketRepository.update({ id: ticketId }, { isUsed: true })
  }

  // update(id: number, updateTicketInput: UpdateTicketInput) {
  //   return
  // }

  //functions for seeding
  saveAll(tickets: Ticket[]): Promise<Ticket[]> {
    return this.TicketRepository.save(tickets)
  }

  truncate(): Promise<void> {
    return this.TicketRepository.clear()
  }
}
