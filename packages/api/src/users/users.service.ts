import { Injectable } from "@nestjs/common"
import { CreateUserInput } from "./dto/create-user.input"
import { UpdateUserInput } from "./dto/update-user.input"
import { InjectRepository } from "@nestjs/typeorm"
import { MongoRepository, Repository } from "typeorm"
import { Role, User } from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
  ) {}

  create(uid: string, email: string, createUserInput: CreateUserInput) {
    const user = new User()
    //req
    user.uid = uid
    user.name = createUserInput.name
    user.email = email

    //opt
    user.role = createUserInput.role ?? Role.USER
    user.locale = createUserInput.locale ?? "nl"
    user.fullname = createUserInput.fullname
    user.phoneNumber = createUserInput.phoneNumber

    //only for admin and staff
    if (user.role === Role.ADMIN || user.role === Role.STAFF) {
      user.brutoMonthlyWage = createUserInput.brutoMonthlyWage
      user.isChief = createUserInput.isChief
      // user.workHours = createUserInput.workHours
      // user.leave = createUserInput.leaveDays
    }
    return this.userRepository.save(user)
  }

  findAll() {
    return this.userRepository.find()
  }

  // findOneById(id: string) {
  //   return this.userRepository.findOneByOrFail({ id: id })
  // }

  findAllStaff(){
    return this.userRepository.find({
      where: {
        $or: [{role: Role.STAFF}, {role: Role.ADMIN}]
        
      } 
    })
  }

  findOneByUid(id: string) {
    return this.userRepository.findOneByOrFail({ uid: id })
  }

  async update(uid: string, updateUserInput: UpdateUserInput) {
    const user = await this.findOneByUid(uid)

    const userUpdate = new User()

    //update user
    userUpdate.email = updateUserInput.email ?? user.email
    userUpdate.fullname = updateUserInput.fullname ?? user.fullname
    userUpdate.name = updateUserInput.name ?? user.name
    userUpdate.phoneNumber = updateUserInput.phoneNumber ?? user.phoneNumber
    
    userUpdate.role = user.role
    userUpdate.uid = user.uid
    userUpdate.id = user.id
    userUpdate.createdAt = user.createdAt

    userUpdate.brutoMonthlyWage = user.brutoMonthlyWage
    userUpdate.isChief = user.isChief
    userUpdate.job = user.job
    
    userUpdate.locale = updateUserInput.locale ?? user.locale
    userUpdate.updatedAt = new Date()
    userUpdate.workLocationId = user.workLocationId

    console.log(user)
    
    //only for admin and staff
    if (user.role === Role.ADMIN || user.role === Role.STAFF) {
      user.brutoMonthlyWage =
        updateUserInput.brutoMonthlyWage ?? user.brutoMonthlyWage
      user.isChief = updateUserInput.isChief ?? user.isChief
    }

    console.log(user)
    return this.userRepository.save(userUpdate)
  }

  remove(id: string) {
    return new Error(`This action removes a #${id} user`)
  }
  //function for seeding
  saveAll(users: User[]) {
    return this.userRepository.save(users)
  }

  truncate() {
    return this.userRepository.clear()
  }
}
