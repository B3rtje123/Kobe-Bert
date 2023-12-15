import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { TicketTypeService } from "./ticket-type.service"
import { TicketType } from "./entities/ticket-type.entity"
import { CreateTicketTypeInput } from "./dto/create-ticket-type.input"
import { UpdateTicketTypeInput } from "./dto/update-ticket-type.input"
import { FireBaseGuard } from "src/authentication/service/guards/firebase.guard"
import { AllowedRoles } from "src/users/decorators/role.decorator"
import { Role } from "src/users/entities/user.entity"
import { UseGuards } from "@nestjs/common"
import { RolesGuard } from "src/users/guards/roles.guards"

@Resolver(() => TicketType)
export class TicketTypeResolver {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @AllowedRoles(Role.ADMIN)
  @UseGuards(FireBaseGuard, RolesGuard)
  @Mutation(() => TicketType)
  createTicketType(
    @Args("createTicketTypeInput") createTicketTypeInput: CreateTicketTypeInput,
  ) {
    return this.ticketTypeService.create(createTicketTypeInput)
  }

  @Query(() => [TicketType], { name: "getAllTicketTypes" })
  findAll() {
    return this.ticketTypeService.findAll()
  }

  @Query(() => TicketType, { name: "getTicketTypeById" })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.ticketTypeService.findOne(id)
  }

  @AllowedRoles(Role.ADMIN)
  @UseGuards(FireBaseGuard, RolesGuard)
  @Mutation(() => TicketType)
  updateTicketType(
    @Args("updateTicketTypeInput") updateTicketTypeInput: UpdateTicketTypeInput,
  ) {
    return this.ticketTypeService.update(
      updateTicketTypeInput.id,
      updateTicketTypeInput,
    )
  }

  @Mutation(() => TicketType)
  removeTicketType(@Args("id", { type: () => Int }) id: string) {
    return this.ticketTypeService.remove(id)
  }
}
