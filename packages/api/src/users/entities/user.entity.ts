import { ObjectType, Field, ID } from "@nestjs/graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm"

export enum Role {
  ADMIN = "ADMIN",
  STAFF = "STAFF",
  USER = "USER",
}

@Entity()
@ObjectType()
//eventueel abstract maken en de entities client en staff ervan laten extenden
export class User {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field()
  uid: string

  @Column({ default: Role.USER })
  @Field(() => String)
  role: Role

  @Column()
  @Field()
  locale?: String

  @CreateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  updatedAt: Date
}
