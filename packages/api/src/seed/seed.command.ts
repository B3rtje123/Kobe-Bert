import { Command } from "nestjs-command"
import { Injectable } from "@nestjs/common"
import { SeedService } from "./seed.service"

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

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
  async delete() {
    console.info("Start deleting clients")
    await this.seedService.deleteAllTickets()
    console.info("Removed tickets")
  }
}
