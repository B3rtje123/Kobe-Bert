import { Module } from "@nestjs/common"
import { TicketTypeService } from "./ticket-type.service"
import { TicketTypeResolver } from "./ticket-type.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TicketType } from "./entities/ticket-type.entity"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([TicketType]), UsersModule],
  providers: [TicketTypeResolver, TicketTypeService],
  exports: [TicketTypeService],
})
export class TicketTypeModule {}
