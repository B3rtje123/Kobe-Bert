import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { Role, User } from "./entities/user.entity"
import { CreateUserInput } from "./dto/create-user.input"
import { UpdateUserInput } from "./dto/update-user.input"
import { FireBaseGuard } from "src/authentication/service/guards/firebase.guard"
import { UseGuards } from "@nestjs/common"
import { FirebaseUser } from "src/authentication/decorators/user.decorator"
import { UserRecord } from "firebase-admin/auth"
import { RolesGuard } from "./guards/roles.guards"
import { AllowedRoles } from "./decorators/role.decorator"
import { query } from "express"

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FireBaseGuard)
  @Mutation(() => User)
  createUser(
    @Args("createUserInput") createUserInput: CreateUserInput,
    @FirebaseUser() user: UserRecord,
  ) {
    return this.usersService.create(user.uid, user.email, createUserInput)
  }

  //only admin and staff can get all users
  @AllowedRoles(Role.ADMIN, Role.STAFF)
  @UseGuards(FireBaseGuard, RolesGuard)
  @Query(() => [User], { name: "getAllUsers" })
  findAll() {
    return this.usersService.findAll()
  }

  // @Query(() => User, { name: "getUserById" })
  // findOne(@Args("string", { type: () => String }) id: string) {
  //   return this.usersService.findOneById(id)
  // }

  @Query(() => User, { name: "getUserByUid" })
  findOneByUid(@Args("string", { type: () => String }) id: string) {
    return this.usersService.findOneByUid(id)
  }

  //only admin can get all users
  @AllowedRoles(Role.ADMIN)
  @UseGuards(FireBaseGuard, RolesGuard)
  @Query(() => [User], { name: "getAllStaff" })
  findAllStaff(){
    return this.usersService.findAllStaff()
  }

  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput)
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => String }) id: string) {
    return this.usersService.remove(id)
  }
}
