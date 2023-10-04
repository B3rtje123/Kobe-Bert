import { Module } from "@nestjs/common"
import { TicketService } from "./ticket.service"
import { TicketResolver } from "./ticket.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Ticket } from "./entities/ticket.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [TicketResolver, TicketService],
  exports: [TicketService],
})
export class TicketModule {}
