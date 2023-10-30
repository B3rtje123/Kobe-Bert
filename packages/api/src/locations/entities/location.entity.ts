import { ObjectType, Field, Int, ID } from "@nestjs/graphql"
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm"
import { string } from "yargs"

export enum LocationType {
  ATTRACTION = "ATTRACTION",
  RESTAURANT = "RESTAURANT",
  SHOP = "SHOP",
  SERVICE = "SERVICE",
  SHOW = "SHOW",
  TOILET = "TOILET",
  PARKING = "PARKING",
  ENTRANCE = "ENTRANCE",
  HOTEL = "HOTEL",
}

@Entity()
@ObjectType()
export class Location {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string

  @Column()
  @Field(() => String)
  name: string

  @Column()
  @Field(() => String)
  type: LocationType

  @Column()
  @Field(() => String)
  openHours: [string] //start and end time

  @Column()
  @Field(() => String)
  coords: [string] //in relation to the park

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date
}
