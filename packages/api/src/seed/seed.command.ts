import { Command } from "nestjs-command"
import { Injectable } from "@nestjs/common"
import { SeedService } from "./seed.service"

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  // seeding tickets --------------------
  @Command({
    command: "seed:database:tickets",
    describe: "Seed the database with tickets",
  })
  async seedTickets() {
    console.info("Start seeding of tickets")
    const tickets = await this.seedService.addTicketFromJson()
    console.info(`${tickets.length} Tickets are added`)
  }

  @Command({
    command: "seed:reset:tickets",
    describe: "Delete all data from the tickets table",
  })
  async deleteTickets() {
    console.info("Start deleting clients")
    await this.seedService.deleteAllTickets()
    console.info("Removed tickets")
  }

  // seeding ticket types -----------------
  @Command({
    command: "seed:database:ticket-types",
    describe: "Seed the database with ticket types",
  })
  async seedTicketTypes() {
    console.info("Start seeding of ticket types")
    const ticketTypes = await this.seedService.addTicketTypeFromJson()
    console.info(`${ticketTypes.length} Ticket types are added`)
  }

  @Command({
    command: "seed:reset:ticket-types",
    describe: "Delete all data from the ticket types table",
  })
  async deleteTicketTypes() {
    console.info("Start deleting ticket types")
    await this.seedService.deleteAllTicketTypes()
    console.info("Removed ticket types")
  }
}
