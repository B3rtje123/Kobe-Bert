import { InputType, Int, Field } from "@nestjs/graphql"
import { IsNotEmpty, isNotEmpty } from "class-validator"
import { LocationType } from "../entities/location.entity"

@InputType()
export class CreateLocationInput {
  @IsNotEmpty()
  @Field(() => String)
  name: string

  @IsNotEmpty()
  @Field(() => String)
  type: LocationType

  @IsNotEmpty()
  @Field(() => String)
  openingHours: [string]

  @IsNotEmpty()
  @Field(() => String)
  coords: [string]
}
