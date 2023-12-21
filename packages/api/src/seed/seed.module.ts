import { Module } from "@nestjs/common"
import { CommandModule } from "nestjs-command"
import { SeedService } from "./seed.service"
import { DatabaseSeedCommand } from "./seed.command"
import { UsersModule } from "src/users/users.module"
import { TicketsModule } from "src/tickets/tickets.module"
import { TicketTypeModule } from "src/ticket-type/ticket-type.module"
import { LocationsModule } from "src/locations/locations.module"

@Module({
  imports: [
    UsersModule,
    TicketsModule,
    CommandModule,
    TicketTypeModule,
    LocationsModule,
  ],
  providers: [SeedService, DatabaseSeedCommand],
})
export class SeedModule {}
