import { Module } from "@nestjs/common"
import { CommandModule } from "nestjs-command"
import { SeedService } from "./seed.service"
import { DatabaseSeedCommand } from "./seed.command"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [UsersModule, CommandModule],
  providers: [SeedService, DatabaseSeedCommand],
})
export class SeedModule {}
