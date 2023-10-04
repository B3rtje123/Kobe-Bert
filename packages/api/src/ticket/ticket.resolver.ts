import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { TicketService } from "./ticket.service"
import { Ticket } from "./entities/ticket.entity"
import { CreateTicketInput } from "./dto/create-ticket.input"
import { UpdateTicketInput } from "./dto/update-ticket.input"

@Resolver(() => Ticket)
export class TicketResolver {
  constructor(private readonly ticketService: TicketService) {}

  @Mutation(() => Ticket, { description: "Create a new ticket using a DTO" })
  createTicket(
    @Args("createTicketInput") createTicketInput: CreateTicketInput,
  ): Promise<Ticket> {
    return this.ticketService.create(createTicketInput)
  }

  @Query(() => [Ticket], { name: "getTicketsPlaceholder" })
  getTickets() {
    return [
      {
        id: "jfksdqjf44s4",
        url: "https://www.google.com",
        type: "1-day",
        startDate: new Date(),
        enddate: new Date(),
        client: {
          name: "Dave",
          fullname: "Dave de duif",
          createdAt: new Date(),
        },
        isUsed: false,
      },
    ]
  }

  @Query(() => [Ticket], { name: "getAllTicket" })
  findAll() {
    return this.ticketService.findAll()
  }

  @Query(() => Ticket, { name: "ticket" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.ticketService.findOne(id)
  }

  @Mutation(() => Ticket)
  updateTicket(
    @Args("updateTicketInput") updateTicketInput: UpdateTicketInput,
  ) {
    return this.ticketService.update(updateTicketInput.id, updateTicketInput)
  }

  @Mutation(() => Ticket)
  removeTicket(@Args("id", { type: () => Int }) id: number) {
    return this.ticketService.remove(id)
  }
}
