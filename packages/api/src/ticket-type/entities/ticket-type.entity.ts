import { ObjectType, Field, Int, Float, ID } from "@nestjs/graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm"

@ObjectType()
@Entity()
export class TicketType {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  name: string

  @Column()
  @Field(() => Int)
  amount: number

  @Column()
  @Field(() => Float)
  price: number

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date
}
