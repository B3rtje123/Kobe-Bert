import { InputType, Int, Field, Float } from "@nestjs/graphql"

@InputType()
export class CreateTicketTypeInput {
  @Field(() => String)
  name: string

  @Field(() => Int)
  amount: number

  @Field(() => Float)
  price: number
}
