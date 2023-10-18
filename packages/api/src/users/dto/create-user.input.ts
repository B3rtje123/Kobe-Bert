import { InputType, Int, Field } from "@nestjs/graphql"
import { IsNotEmpty } from "class-validator"
import { Role } from "../entities/user.entity"
import { WorkHours } from "src/interfaces/workHours.interface"

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String, { description: "name of the current user" })
  name: string

  @IsNotEmpty()
  @Field(() => String, { description: "email of the current user" })
  email: string

  @Field(() => String, {
    description: "role of the current user",
    nullable: true,
  })
  role: Role

  @Field(() => String, {
    description: "optional locale of the current user",
    nullable: true,
  })
  locale?: string

  @Field(() => String, {
    description: "optional phone number of the current user",
    nullable: true,
  })
  phoneNumber?: string

  @Field(() => String, {
    description: "optional full name of the current user",
    nullable: true,
  })
  fullname?: string

  @Field(() => Int, {
    description: "optional bruto monthly wage of the current user",
    nullable: true,
  })
  brutoMonthlyWage?: number

  @Field(() => Boolean, {
    description: "optional is chief of the current user",
    nullable: true,
  })
  isChief?: boolean

  // @Field(() => String, {
  //   nullable: true,
  // })
  // workHours?: WorkHours

  // @Field(() => String, {
  //   nullable: true,
  // })
  // leaveDays?: Date[]
}
