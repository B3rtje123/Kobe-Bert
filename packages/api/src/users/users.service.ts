import { Injectable } from "@nestjs/common"
import { CreateUserInput } from "./dto/create-user.input"
import { UpdateUserInput } from "./dto/update-user.input"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Role, User } from "./entities/user.entity"

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  findOneByUid(id: string) {
    return this.userRepository.findOneByOrFail({ uid: id })
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    let user = new User()

    // //get user
    // const user = this.findOneByUid(uid).then(u => {
    //   if (!u) {
    //     throw new Error("User not found")
    //   }
    // }).finally(() => {
    //   return u
    // })

    console.log(updateUserInput)
    console.log(id)

    //update user
    user.uid = id
    user.name = updateUserInput.name ?? user.name
    // user.email = updateUserInput.email ?? user.email
    user.role = updateUserInput.role ?? user.role
    user.locale = updateUserInput.locale ?? user.locale
    user.fullname = updateUserInput.fullname ?? user.fullname
    user.phoneNumber = updateUserInput.phoneNumber ?? user.phoneNumber

    console.log(user)
    //only for admin and staff
    if (user.role === Role.ADMIN || user.role === Role.STAFF) {
      user.brutoMonthlyWage =
        updateUserInput.brutoMonthlyWage ?? user.brutoMonthlyWage
      user.isChief = updateUserInput.isChief ?? user.isChief
    }

    console.log(user)
    return this.userRepository.update(user.id, user)
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
