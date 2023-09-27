import { Module } from "@nestjs/common"
import { ClientService } from "./client.service"
import { ClientResolver } from "./client.resolver"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Client } from "./entities/client.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  providers: [ClientResolver, ClientService],

  exports: [ClientService],
})
export class ClientModule {}
