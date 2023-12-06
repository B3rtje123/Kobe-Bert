import { Injectable } from "@nestjs/common"

import { UsersService } from "src/users/users.service"
import { User } from "src/users/entities/user.entity"
import { Ticket } from "src/tickets/entities/ticket.entity"
import { TicketsService } from "src/tickets/tickets.service"

//data
import * as clients from "./data/clients.json"
import * as tickets from "./data/tickets.json"
import * as ticketTypes from "./data/ticketTypes.json"
import { TicketType } from "src/ticket-type/entities/ticket-type.entity"
import { TicketTypeService } from "src/ticket-type/ticket-type.service"

@Injectable()
export class SeedService {
  constructor(
    private usersService: UsersService,
    private ticketService: TicketsService,
    private ticketTypesService: TicketTypeService,
  ) {}

  // async addClientsFromJson(): Promise<User[]> {
  //   let theClients: User[] = []
  //   for (let client of clients) {
  //     const c = new User()
  //     c.name = client.name
  //     c.fullname = client.fullname

  //     theClients.push(c)
  //   }

  //   return this.usersService.saveAll(theClients)
  // }

  // seeding ticket types ------------------------------------------
  async addTicketTypeFromJson(): Promise<TicketType[]> {
    let theTicketTypes: TicketType[] = []
    for (let ticketType of ticketTypes) {
      const t = new TicketType()
      t.name = ticketType.name
      t.amount = ticketType.amount
      t.price = ticketType.price

      theTicketTypes.push(t)
    }

    return this.ticketTypesService.saveAll(theTicketTypes)
  }

  async deleteAllTicketTypes(): Promise<void> {
    return this.ticketTypesService.truncate()
  }

  // seeding tickets ------------------------------------------
  async addTicketFromJson(): Promise<Ticket[]> {
    let theTickets: Ticket[] = []
    for (let ticket of tickets) {
      const t = new Ticket()
      // let type: TicketType = ticket.type

      //get types of tickets
      const types = await this.ticketTypesService.findAll()

      t.type = types.find(type => type.name === ticket.type)

      t.startDay = new Date(ticket.startDay)
      t.endDay = new Date(ticket.endDay)
      // t.isUsed = ticket.isUsed
      // t.clientUid = ticket.clientUid

      theTickets.push(t)
    }

    return this.ticketService.saveAll(theTickets)
  }

  async deleteAllTickets(): Promise<void> {
    return this.ticketService.truncate()
  }

  // delete all seeding -----------------------------------------
  async deleteAllClients(): Promise<void> {
    return this.usersService.truncate()
  }
}
