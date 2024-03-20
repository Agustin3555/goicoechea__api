import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.users.save(createUserDto)
  }

  async findAll() {
    return await this.users.find()
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.users.update(id, updateUserDto)
  }

  async remove(id: number) {
    return `This action removes a #${id} user`
  }
}
