import { InputType, Int, Field } from "@nestjs/graphql"
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  isBoolean,
  isNotEmpty,
  IsDate,
} from "class-validator"

@InputType()
export class CreateTicketInput {
  @IsNotEmpty()
  @Field()
  url: string

  @IsNotEmpty()
  @Field()
  type: string

  @IsDate()
  @IsNotEmpty()
  @Field()
  startDate: Date

  @IsDate()
  @IsNotEmpty()
  @Field()
  enddate: Date

  @IsNotEmpty()
  @Field()
  clientId: string

  @IsBoolean()
  @IsNotEmpty()
  @Field()
  isUsed: boolean
}
