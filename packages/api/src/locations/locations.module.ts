import { Module } from "@nestjs/common"
import { LocationsService } from "./locations.service"
import { LocationsResolver } from "./locations.resolver"
import { Type } from "class-transformer"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Location } from "./entities/location.entity"
import { UsersService } from "src/users/users.service"
import { UsersModule } from "src/users/users.module"

@Module({
  imports: [TypeOrmModule.forFeature([Location]), UsersModule],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
