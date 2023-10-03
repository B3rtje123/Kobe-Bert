import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { ClientService } from "./client.service"
import { Client } from "./entities/client.entity"
import { CreateClientInput } from "./dto/create-client.input"
import { UpdateClientInput } from "./dto/update-client.input"
import { FirebaseUser } from "../authentication/decorators/user.decorator"
import { FireBaseGuard } from "src/authentication/service/guards/firebase.guard"
import { UserRecord } from "firebase-admin/auth"
import { UseGuards } from "@nestjs/common"

@Resolver(() => Client)
export class ClientResolver {
  constructor(private readonly clientService: ClientService) {}

  @Mutation(() => Client)
  createClient(
    @Args("createClientInput") createClientInput: CreateClientInput,
  ) {
    return this.clientService.create(createClientInput)
  }

  @Query(() => [Client], { name: "getClientsPlaceholder" })
  getClients() {
    return [
      {
        id: "jfksdqjf44s4",
        name: "Dave",
        fullname: "Dave de duif",
        createdAt: new Date(),
      },
    ]
  }

  @UseGuards(FireBaseGuard)
  @Query(() => [Client], { name: "getAllClients" })
  findAll(@FirebaseUser() currentUser: UserRecord) {
    return this.clientService.findAll()
  }

  @Query(() => Client, { name: "client" })
  findOne(@Args("id", { type: () => Int }) id: number) {
    return this.clientService.findOne(id)
  }

  @Mutation(() => Client)
  updateClient(
    @Args("updateClientInput") updateClientInput: UpdateClientInput,
  ) {
    return this.clientService.update(updateClientInput.id, updateClientInput)
  }

  @Mutation(() => Client)
  removeClient(@Args("id", { type: () => Int }) id: number) {
    return this.clientService.remove(id)
  }
}
