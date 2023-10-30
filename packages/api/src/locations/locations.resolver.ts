import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql"
import { LocationsService } from "./locations.service"
import { Location } from "./entities/location.entity"
import { CreateLocationInput } from "./dto/create-location.input"
import { UpdateLocationInput } from "./dto/update-location.input"
import { FireBaseGuard } from "src/authentication/service/guards/firebase.guard"
import { AllowedRoles } from "src/users/decorators/role.decorator"
import { RolesGuard } from "src/users/guards/roles.guards"
import { Role } from "src/users/entities/user.entity"
import { UseGuards } from "@nestjs/common"

@Resolver(() => Location)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @AllowedRoles(Role.ADMIN)
  @UseGuards(FireBaseGuard, RolesGuard)
  @Mutation(() => Location)
  createLocation(
    @Args("createLocationInput") createLocationInput: CreateLocationInput,
  ) {
    return this.locationsService.create(createLocationInput)
  }

  @Query(() => [Location], { name: "getAllLocations" })
  findAll() {
    return this.locationsService.findAll()
  }

  @Query(() => Location, { name: "GetLocationById" })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.locationsService.findOne(id)
  }

  @AllowedRoles(Role.ADMIN)
  @UseGuards(FireBaseGuard, RolesGuard)
  @Mutation(() => Location)
  updateLocation(
    @Args("updateLocationInput") updateLocationInput: UpdateLocationInput,
  ) {
    return this.locationsService.update(
      updateLocationInput.id,
      updateLocationInput,
    )
  }

  @AllowedRoles(Role.ADMIN)
  @UseGuards(FireBaseGuard, RolesGuard)
  @Mutation(() => Location)
  removeLocation(@Args("id", { type: () => Int }) id: number) {
    return this.locationsService.remove(id)
  }
}
