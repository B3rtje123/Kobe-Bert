import { Module } from "@nestjs/common"
import { ClientModule } from "src/client/client.module"
import { CommandModule } from "nestjs-command"
import { StaffModule } from "src/staff/staff.module"
import { SeedService } from "./seed.service"
import { DatabaseSeedCommand } from "./seed.command"

@Module({
  imports: [ClientModule, StaffModule, CommandModule],
  providers: [SeedService, DatabaseSeedCommand],
})
export class SeedModule {}
