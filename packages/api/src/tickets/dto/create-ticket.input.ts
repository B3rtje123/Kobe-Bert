import { InputType, Int, Field } from "@nestjs/graphql"
import { Type } from "class-transformer"
import { IsNotEmpty } from "class-validator"
import { TicketType } from "src/ticket-type/entities/ticket-type.entity"
import { Ticket } from "../entities/ticket.entity"

@InputType()
export class CreateTicketInput {
  @IsNotEmpty()
  @Field(() => String)
  typeId: string

  @IsNotEmpty()
  @Field(() => Date)
  startDay: Date

  @Field(() => Date, { nullable: true })
  endDay?: Date

  @Field(() => String, { nullable: true })
  clientUid?: string
}
