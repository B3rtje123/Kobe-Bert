import { ObjectType, Field, ID } from "@nestjs/graphql"
import { WorkHours } from "src/interfaces/workHours.interface"
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

  @Column()
  @Field()
  name: string

  @Column()
  @Field()
  email: string

  @Column({ default: Role.USER })
  @Field(() => String, { nullable: true })
  role: Role

  @Column()
  @Field({ nullable: true })
  locale?: string

  @Column()
  @Field({ nullable: true })
  fullname: string

  @Column()
  @Field({ nullable: true })
  phoneNumber: string

  @Column()
  @Field({ nullable: true })
  brutoMonthlyWage?: number

  @Column()
  @Field({ nullable: true })
  isChief?: boolean

  //TODO: add workhours
  // @Column()
  // @Field({ nullable: true })
  // workHours?: WorkHours

  //TODO: add leave
  // @Column("datetime", { array: true })
  // @Field({ nullable: true })
  // leave?: Date[] //startdate & enddate

  @Column()
  @Field({ nullable: true })
  job?: string

  //TODO: add location entity
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
