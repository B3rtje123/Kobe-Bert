import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketTypeService } from './ticket-type.service';
import { TicketType } from './entities/ticket-type.entity';
import { CreateTicketTypeInput } from './dto/create-ticket-type.input';
import { UpdateTicketTypeInput } from './dto/update-ticket-type.input';

@Resolver(() => TicketType)
export class TicketTypeResolver {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @Mutation(() => TicketType)
  createTicketType(@Args('createTicketTypeInput') createTicketTypeInput: CreateTicketTypeInput) {
    return this.ticketTypeService.create(createTicketTypeInput);
  }

  @Query(() => [TicketType], { name: 'ticketType' })
  findAll() {
    return this.ticketTypeService.findAll();
  }

  @Query(() => TicketType, { name: 'ticketType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.ticketTypeService.findOne(id);
  }

  @Mutation(() => TicketType)
  updateTicketType(@Args('updateTicketTypeInput') updateTicketTypeInput: UpdateTicketTypeInput) {
    return this.ticketTypeService.update(updateTicketTypeInput.id, updateTicketTypeInput);
  }

  @Mutation(() => TicketType)
  removeTicketType(@Args('id', { type: () => Int }) id: number) {
    return this.ticketTypeService.remove(id);
  }
}
