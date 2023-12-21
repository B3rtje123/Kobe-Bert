import { Injectable } from "@nestjs/common"
import { CreateTicketInput } from "./dto/create-ticket.input"
import { UpdateTicketInput } from "./dto/update-ticket.input"
import { Ticket } from "./entities/ticket.entity"
import { Repository } from "typeorm"
import { ObjectId } from "mongodb"
import { InjectRepository } from "@nestjs/typeorm"
import { UsersService } from "src/users/users.service"
import { TicketType } from "src/ticket-type/entities/ticket-type.entity"
import { TicketTypeService } from "src/ticket-type/ticket-type.service"

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly TicketRepository: Repository<Ticket>,
    private readonly TicketTypeService: TicketTypeService,
    private readonly UsersService: UsersService,
  ) {}

  async create(createTicketInput: CreateTicketInput, userUid: string) {
    const ticket = new Ticket()
    ticket.isUsed = false
    ticket.typeId = createTicketInput.typeId
    ticket.startDay = createTicketInput.startDay

    ticket.type = await this.TicketTypeService.findOne(ticket.typeId)

    if (ticket.type.name !== "YEARPASS") ticket.endDay = ticket.startDay
    if (ticket.type.name === "YEARPASS")
      ticket.endDay.setFullYear(ticket.startDay.getFullYear() + 1)

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
      ticket.type.name.substring(0, 3) +
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

  async findByUid(uid: string): Promise<Ticket[]> {
    let tickets = await this.TicketRepository.find({
      where: { clientUid: uid },
    })

    // const newTickets = await tickets.map(async ticket => {
    let counter = 0
    const newTickets = await Promise.all(
      tickets.map(async ticket => {
        ticket.type = await this.TicketTypeService.findOne(ticket.typeId)
        ticket.client = await this.UsersService.findOneByUid(ticket.clientUid)
        tickets[counter] = ticket
        // console.log(tickets[counter])
        counter++
        return ticket
      }),
    )
    // console.log(tickets)
    return newTickets
  }

  async findOneById(id: string) {
    const ticket = await this.TicketRepository.findOneBy({
      // @ts-ignore
      _id: new ObjectId(id),
    })
    ticket.type = await this.TicketTypeService.findOne(ticket.typeId)
    ticket.client = await this.UsersService.findOneByUid(ticket.clientUid)
    return ticket
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
