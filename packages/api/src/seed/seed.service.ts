import { Injectable } from "@nestjs/common"

import * as clients from "./data/clients.json"
import { UsersService } from "src/users/users.service"
import { User } from "src/users/entities/user.entity"

@Injectable()
export class SeedService {
  constructor(private usersService: UsersService) {}

  async addClientsFromJson(): Promise<User[]> {
    let theClients: User[] = []
    for (let client of clients) {
      const c = new User()
      c.name = client.name
      c.fullname = client.fullname

      theClients.push(c)
    }

    return this.usersService.saveAll(theClients)
  }

  async deleteAllClients(): Promise<void> {
    return this.usersService.truncate()
  }
}
