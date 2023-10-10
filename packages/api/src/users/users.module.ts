import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersResolver } from "./users.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"

@Module({
  imports: [TypeOrmModule.forFeature([])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
