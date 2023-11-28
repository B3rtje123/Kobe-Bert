import { CreateTicketTypeInput } from './create-ticket-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTicketTypeInput extends PartialType(CreateTicketTypeInput) {
  @Field(() => Int)
  id: number;
}
