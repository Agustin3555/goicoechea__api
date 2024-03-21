import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { ProtectedUserDto } from './dto/protectedUser.dto'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  asProtectedUser(user: User) {
    delete user.password
    return user as ProtectedUserDto
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.users.save(createUserDto)

    return this.asProtectedUser(user)
  }

  async findAll() {
    return await this.users.find({
      select: { id: true, name: true, lastName: true },
    })
  }

  async findOne(id: number) {
    const user = await this.users.findOneBy({ id })

    return this.asProtectedUser(user)
  }

  async findOneByEmail(email: string) {
    return await this.users.findOneBy({ email })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.users.update(id, updateUserDto)
  }

  async remove(id: number) {
    return `This action removes a #${id} user`
  }
}
