import { InputType, Int, Field } from "@nestjs/graphql"
import { TicketType } from "../entities/ticket.entity"
import { IsNotEmpty } from "class-validator"

@InputType()
export class CreateTicketInput {
  @IsNotEmpty()
  @Field(() => String)
  type: TicketType

  @IsNotEmpty()
  @Field(() => Date)
  startDay: Date

  @Field(() => Date, { nullable: true })
  endDay?: Date

  @Field(() => String, { nullable: true })
  clientId?: string
}
