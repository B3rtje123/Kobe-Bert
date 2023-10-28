import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { TicketsService } from "./tickets.service"
import { Ticket } from "./entities/ticket.entity"
import { CreateTicketInput } from "./dto/create-ticket.input"
import { UpdateTicketInput } from "./dto/update-ticket.input"
import { UseGuards } from "@nestjs/common"
import { FireBaseGuard } from "src/authentication/service/guards/firebase.guard"
import { AllowedRoles } from "src/users/decorators/role.decorator"
import { Role } from "src/users/entities/user.entity"
import { RolesGuard } from "src/users/guards/roles.guards"
import { FirebaseUser } from "src/authentication/decorators/user.decorator"
import { UserRecord } from "firebase-admin/auth"
import { UsersService } from "src/users/users.service"

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(
    private readonly ticketsService: TicketsService,
    private readonly userService: UsersService,
  ) {}

  @Mutation(() => Ticket)
  createTicket(
    @Args("createTicketInput") createTicketInput: CreateTicketInput,
  ) {
    //TODO: check if user is allowed to create ticket
    return this.ticketsService.create(
      createTicketInput,
      createTicketInput.clientUid,
    )
  }

  @AllowedRoles(Role.ADMIN, Role.STAFF) //only staff and admin can get all tickets
  @UseGuards(FireBaseGuard, RolesGuard)
  @Query(() => [Ticket], { name: "getTickets" })
  findAll() {
    return this.ticketsService.findAll()
  }

  @UseGuards(FireBaseGuard)
  @Query(() => [Ticket], { name: "getTicketsByUserId" })
  findByUid(@FirebaseUser() user: UserRecord) {
    //TODO: check if staff or admin
    //TODO: bug: client returns null

    return this.ticketsService.findByUid(user.uid)
  }

  @Query(() => Ticket, { name: "getTicketById" })
  findOneById(@Args("id", { type: () => String }) id: string) {
    // console.log("ticket", ticket)
    return this.ticketsService.findOneById(id)
  }

  @UseGuards(FireBaseGuard, RolesGuard)
  @AllowedRoles(Role.ADMIN, Role.STAFF) //only staff and admin can get all tickets
  @Query(() => Ticket, { name: "getTicketByBarcode" })
  findOneByBarcode(@Args("barcode", { type: () => String }) barcode: string) {
    return this.ticketsService.findOneByBarcode(barcode)
  }

  @UseGuards(FireBaseGuard, RolesGuard)
  @AllowedRoles(Role.ADMIN, Role.STAFF) //only staff and admin can update tickets
  @Mutation(() => Ticket)
  async TicketUsed(@Args("ticketUsed") updateTicketInput: UpdateTicketInput) {
    return await this.ticketsService.findOneById(updateTicketInput.id)
  }
}
