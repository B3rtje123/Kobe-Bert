import { ObjectType, Field, Int } from "@nestjs/graphql"
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm"

@ObjectType()
export class TicketType {
  @ObjectIdColumn()
  @Field(() => Int)
  id: number

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  amount: number

  @Column()
  @Field()
  price: number

  @CreateDateColumn()
  @Field()
  createdAt: Date

  @UpdateDateColumn()
  @Field()
  updatedAt: Date
}
