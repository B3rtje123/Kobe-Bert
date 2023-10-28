import { Module } from "@nestjs/common"
import { TicketsService } from "./tickets.service"
import { TicketsResolver } from "./tickets.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Ticket } from "./entities/ticket.entity"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Ticket]), UsersModule],
  providers: [TicketsResolver, TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
