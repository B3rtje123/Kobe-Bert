import { ObjectType, Field, Int, ID } from "@nestjs/graphql"
import { User } from "src/users/entities/user.entity"
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm"

//TODO: make into entity
export enum TicketType {
  STANDARD = "STANDARD",
  KIDS = "KIDS",
  SENIOR = "SENIOR",
  STUDENT = "STUDENT",
  GROUP = "GROUP",
  YEARPASS = "YEARPASS",
}

@ObjectType()
@Entity()
export class Ticket {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  barcode: string //code-128 format: TYP YYMMDD XXXX (type, startday, id)

  @Column()
  @Field(() => String)
  type: TicketType

  @Column({ type: "date" })
  @Field()
  startDay: Date

  @Column({ type: "date", nullable: true })
  @Field()
  endDay: Date

  @Column({ default: false })
  @Field()
  isUsed: boolean

  @Column({ nullable: true })
  clientId: string

  @Field(() => User)
  client: User

  @CreateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  updatedAt: Date
}
