import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTicketInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
