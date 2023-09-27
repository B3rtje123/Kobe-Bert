import { InputType, Int, Field } from "@nestjs/graphql"

@InputType()
export class CreateClientInput {
  @Field()
  name: string

  @Field()
  fullname: string

  // @Field()
  // createdAt: Date
}
