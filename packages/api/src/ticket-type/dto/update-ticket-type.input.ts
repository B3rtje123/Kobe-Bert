import { IsNotEmpty } from "class-validator"
import { CreateTicketTypeInput } from "./create-ticket-type.input"
import { InputType, Field, Int, PartialType, Float } from "@nestjs/graphql"

@InputType()
export class UpdateTicketTypeInput extends PartialType(CreateTicketTypeInput) {
  @IsNotEmpty()
  @Field(() => String)
  id: string

  @Field(() => String, { nullable: true })
  name: string

  @Field(() => Int, { nullable: true })
  amount: number

  @Field(() => Float, { nullable: true })
  price: number
}
