import { Command } from "nestjs-command"
import { Injectable } from "@nestjs/common"
import { SeedService } from "./seed.service"

@Injectable()
export class DatabaseSeedCommand {
  constructor(private readonly seedService: SeedService) {}

  @Command({
    command: "seed:database:clients",
    describe: "Seed the database with clients",
  })
  async seedBirds() {
    console.info("🪺 Start seeding of clients")
    const birds = await this.seedService.addClientsFromJson()
    console.info(`${birds.length} Clients are added`)
  }

  @Command({
    command: "seed:reset:clients",
    describe: "Delete all data from the clients table",
  })
  async delete() {
    console.info("🔪 Start deleting clients")
    await this.seedService.deleteAllClients()
    console.info("🪶 Removed clients")
  }
}
