import { ObjectType, Field, Int, ID } from "@nestjs/graphql"

@ObjectType({ description: "client" })
export class Client {
  @Field(() => ID)
  id: string

  @Field()
  name: string
}
