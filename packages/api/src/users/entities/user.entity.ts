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

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  fullname: string

  @Column()
  @Field()
  email: string

  @Column()
  @Field()
  phoneNumber: string

  @Column()
  @Field({ nullable: true })
  brutoMonthlyWage?: string

  @Column()
  @Field({ nullable: true })
  isChief?: string

  // @Column()
  // @Field({ nullable: true })
  // workDays?: []

  // @Column()
  // @Field({ nullable: true })
  // leave?: []

  @Column()
  @Field({ nullable: true })
  job?: string

  // @Field(() => Location, { nullable: true })
  // workLocation?: Location

  @Column()
  workLocationId?: string

  @CreateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ type: "timestamp", nullable: true })
  @Field()
  updatedAt: Date
}
