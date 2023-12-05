import { Injectable } from "@nestjs/common"
import { CreateTicketTypeInput } from "./dto/create-ticket-type.input"
import { UpdateTicketTypeInput } from "./dto/update-ticket-type.input"
import { InjectRepository } from "@nestjs/typeorm"
import { TicketType } from "./entities/ticket-type.entity"
import { Repository } from "typeorm"
import { ObjectId } from "mongodb"

@Injectable()
export class TicketTypeService {
  constructor(
    @InjectRepository(TicketType)
    private readonly TicketTypeRepository: Repository<TicketType>,
  ) {}

  create(createTicketTypeInput: CreateTicketTypeInput) {
    const type = new TicketType()
    type.name = createTicketTypeInput.name
    type.amount = createTicketTypeInput.amount
    type.price = createTicketTypeInput.price
    return this.TicketTypeRepository.save(type)
  }

  findAll() {
    return this.TicketTypeRepository.find()
  }

  findOne(id: string) {
    //@ts-ignore
    return this.TicketTypeRepository.findOne({ _id: new ObjectId(id) })
  }

  async update(id: string, updateTicketTypeInput: UpdateTicketTypeInput) {
    const currentTicketType = await this.findOne(id)

    const updatedTicketType = new TicketType()
    updatedTicketType.id = currentTicketType.id
    updatedTicketType.name =
      updateTicketTypeInput.name ?? currentTicketType.name
    updatedTicketType.amount =
      updateTicketTypeInput.amount ?? currentTicketType.amount
    updatedTicketType.price =
      updateTicketTypeInput.price ?? currentTicketType.price

    return this.TicketTypeRepository.save(updatedTicketType)
  }

  remove(id: string) {
    return this.TicketTypeRepository.delete(id)
  }
}
