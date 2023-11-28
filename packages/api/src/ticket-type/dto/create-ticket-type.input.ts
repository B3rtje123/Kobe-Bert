import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
