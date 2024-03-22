import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private users: Repository<User>,
  ) {}

  async hashPassword(dto: { password?: string }) {
    const { password } = dto

    if (password) {
      const hashedPassword = await hash(password, 10)
      dto.password = hashedPassword
    }
  }

  async create(createUserDto: CreateUserDto) {
    this.hashPassword(createUserDto)

    const user = await this.users.save(createUserDto)
    delete user.password

    return user
  }

  async findAll() {
    return await this.users.find({
      select: { id: true, name: true, lastName: true },
    })
  }

  async findOne(id: number) {
    const user = await this.users.findOneBy({ id })
    if (!user) throw new BadRequestException()

    return user
  }

  async findByEmail(email: string) {
    return await this.users.findOneBy({ email })
  }

  async findToLogin(email: string) {
    return await this.users.findOne({
      where: { email },
      select: { password: true, role: true },
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id)

    return await this.users.update(id, updateUserDto)
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    this.hashPassword(updateUserDto)

    return await this.users.update({ email }, updateUserDto)
  }

  async remove(id: number) {
    return `This action removes a #${id} user`
  }
}
