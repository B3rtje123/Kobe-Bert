import { Module } from "@nestjs/common"
import { TicketTypeService } from "./ticket-type.service"
import { TicketTypeResolver } from "./ticket-type.resolver"

@Module({
  providers: [TicketTypeResolver, TicketTypeService],
})
export class TicketTypeModule {}
