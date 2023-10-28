// import { InputType } from "@nestjs/graphql"

// @InputType()
export interface WorkHours {
  monday: string[] //array of 2 times: start time and end time of shift
  tuesday: string[]
  wednesday: string[]
  thursday: string[]
  friday: string[]
  saturday: string[]
  sunday: string[]
}
