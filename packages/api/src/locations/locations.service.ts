import { Injectable } from "@nestjs/common"
import { CreateLocationInput } from "./dto/create-location.input"
import { UpdateLocationInput } from "./dto/update-location.input"
import { InjectRepository } from "@nestjs/typeorm"
import { Location } from "./entities/location.entity"
import { Repository } from "typeorm"
import { ObjectId } from "mongodb"

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly LocationRepository: Repository<Location>,
  ) {}

  create(createLocationInput: CreateLocationInput) {
    // console.log(createLocationInput)
    const location = new Location()
    location.name = createLocationInput.name
    location.type = createLocationInput.type
    location.openHours = createLocationInput.openingHours
    location.coords = createLocationInput.coords
    console.log(location)
    return this.LocationRepository.save(createLocationInput)
  }

  findAll() {
    return this.LocationRepository.find()
  }

  findOne(id: string) {
    //@ts-ignore
    return this.LocationRepository.findOne({ _id: new ObjectId(id) })
  }

  async update(id: string, updateLocationInput: UpdateLocationInput) {
    const currentLocation = await this.findOne(id)

    const updatedLocation = new Location()
    updatedLocation.id = currentLocation.id
    updatedLocation.name = updateLocationInput.name ?? currentLocation.name
    updatedLocation.type = updateLocationInput.type ?? currentLocation.type
    updatedLocation.openHours =
      updateLocationInput.openingHours ?? currentLocation.openHours
    updatedLocation.coords =
      updateLocationInput.coords ?? currentLocation.coords
    updatedLocation.createdAt = currentLocation.createdAt
    updatedLocation.updatedAt = new Date()
    return this.LocationRepository.save(updatedLocation)
  }

  remove(id: number) {
    return this.remove(id)
  }
}
