import { Injectable } from "@nestjs/common"
import { CreateClientInput } from "./dto/create-client.input"
import { UpdateClientInput } from "./dto/update-client.input"
import { Client } from "./entities/client.entity"
import { Repository } from "typeorm"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  findAll() {
    return this.clientRepository.find()
  }

  create(createClientInput: CreateClientInput): Promise<Client> {
    const b = new Client()
    b.name = createClientInput.name
    b.fullname = createClientInput.fullname

    return this.clientRepository.save(b)
  }

  findOne(id: number) {
    return `This action returns a #${id} client`
  }

  update(id: number, updateClientInput: UpdateClientInput) {
    return `This action updates a #${id} client`
  }

  remove(id: number) {
    return `This action removes a #${id} client`
  }
}
