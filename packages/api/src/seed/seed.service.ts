import { Injectable } from "@nestjs/common"
import { ClientService } from "src/client/client.service"
import { Client } from "../client/entities/client.entity"

import * as clients from "./data/clients.json"

@Injectable()
export class SeedService {
  constructor(private clientService: ClientService) {}

  async addClientsFromJson(): Promise<Client[]> {
    let theClients: Client[] = []
    for (let client of clients) {
      const c = new Client()
      c.name = client.name
      c.fullname = client.fullname

      theClients.push(c)
    }

    return this.clientService.saveAll(theClients)
  }

  async deleteAllClients(): Promise<void> {
    return this.clientService.truncate()
  }
}
