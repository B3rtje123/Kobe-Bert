import { ObjectType, Field, Int, ID } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm"

@Entity()
@ObjectType({ description: "client" })
export class Client {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  fullname: string

  @CreateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  createdAt: Date
}
