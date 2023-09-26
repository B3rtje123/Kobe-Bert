import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Staff {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}
