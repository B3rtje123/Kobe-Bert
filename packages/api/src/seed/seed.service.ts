import { Injectable } from "@nestjs/common"

import { UsersService } from "src/users/users.service"
import { User } from "src/users/entities/user.entity"
import { Ticket, TicketType } from "src/tickets/entities/ticket.entity"
import { TicketsService } from "src/tickets/tickets.service"

//data
import * as clients from "./data/clients.json"
import * as tickets from "./data/tickets.json"

@Injectable()
export class SeedService {
  constructor(
    private usersService: UsersService,
    private ticketService: TicketsService,
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

  async addTicketFromJson(): Promise<Ticket[]> {
    let theTickets: Ticket[] = []
    for (let ticket of tickets) {
      const t = new Ticket()
      // let type: TicketType = ticket.type
      t.type = TicketType[ticket.type]
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

  async deleteAllClients(): Promise<void> {
    return this.usersService.truncate()
  }
}
