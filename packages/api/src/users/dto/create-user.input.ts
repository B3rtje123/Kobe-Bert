import { InputType, Int, Field } from "@nestjs/graphql"

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: "optional locale of the current user" })
  locale: String
}
