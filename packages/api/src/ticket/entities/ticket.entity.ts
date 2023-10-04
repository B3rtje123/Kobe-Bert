import { ObjectType, Field, ID } from "@nestjs/graphql"
import { Client } from "src/client/entities/client.entity"
import { Column, Entity, ObjectIdColumn } from "typeorm"

@Entity()
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
  type: string

  @Column({ type: "timestamp" })
  @Field()
  startDate: Date

  @Column({ type: "timestamp" })
  @Field()
  enddate: Date

  //typeorm
  @Column()
  clientId: string

  //graphql
  @Field(() => Client, { nullable: true })
  client: Client

  @Column()
  @Field()
  isUsed: boolean
}
