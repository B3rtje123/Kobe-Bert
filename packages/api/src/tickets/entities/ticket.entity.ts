import { ObjectType, Field, Int, ID, registerEnumType } from "@nestjs/graphql"
import { User } from "../../users/entities/user.entity"
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm"
import { TicketType } from "src/ticket-type/entities/ticket-type.entity"

//TODO: make into entity
// export enum TicketType {
//   STANDARD = "STANDARD",
//   KIDS = "KIDS",
//   SENIOR = "SENIOR",
//   STUDENT = "STUDENT",
//   GROUP = "GROUP",
//   YEARPASS = "YEARPASS",
// }

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
  typeId: string

  @Field(() => TicketType)
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

  @Field()
  @Column({ nullable: true })
  clientUid: string

  @Field(() => User, { nullable: true })
  client: User

  @CreateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  updatedAt: Date
}
