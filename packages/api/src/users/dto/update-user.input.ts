import { IsNotEmpty } from "class-validator"
import { Role } from "../entities/user.entity"
import { CreateUserInput } from "./create-user.input"
import { InputType, Field, Int, PartialType } from "@nestjs/graphql"
import { WorkHours } from "../../interfaces/workHours.interface"

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @Field(() => String)
  uid: string

  @Field(() => String, {
    nullable: true,
  })
  role?: Role

  @Field(() => String, {
    nullable: true,
  })
  name?: string
  
  @Field(() => String, {
    nullable: true,
  })
  familyName?: string

  @Field(() => String, {
    nullable: true,
  })
  locale?: string

  @Field(() => String, {
    nullable: true,
  })
  phoneNumber?: string

  @Field(() => String, {
    nullable: true,
  })
  fullname?: string

  @Field(() => Int, {
    nullable: true,
  })
  brutoMonthlyWage?: number

  @Field(() => Boolean, {
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
