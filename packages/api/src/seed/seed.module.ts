import { Module } from "@nestjs/common"
import { CommandModule } from "nestjs-command"
import { SeedService } from "./seed.service"
import { DatabaseSeedCommand } from "./seed.command"
import { UsersModule } from "src/users/users.module"
import { TicketsModule } from "src/tickets/tickets.module"

@Module({
  imports: [UsersModule, TicketsModule, CommandModule],
  providers: [SeedService, DatabaseSeedCommand],
})
export class SeedModule {}
