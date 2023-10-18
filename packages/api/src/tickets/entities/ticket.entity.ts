import { ObjectType, Field, Int, ID } from "@nestjs/graphql"
import { User } from "src/users/entities/user.entity"
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm"

export enum TicketType {
  STANDARD = "STANDARD",
  KIDS = "KIDS",
  SENIOR = "SENIOR",
  STUDENT = "STUDENT",
  GROUP = "GROUP",
  YEARPASS = "YEARPASS",
}

@ObjectType()
export class Ticket {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  url: string

  @Column()
  @Field()
  type: TicketType

  @Column()
  @Field()
  startDay: Date

  @Column()
  @Field()
  endDay: Date

  @Column()
  @Field()
  isUsed: boolean

  @Column()
  @Field()
  isSoldOut: boolean

  @Column()
  @Field()
  price: number

  @Column()
  clientId: string

  @Field()
  client: User

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @UpdateDateColumn()
  @Field()
  updatedAt: Date
}
