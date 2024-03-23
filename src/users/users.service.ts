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

  private async hashPassword(dto: { password?: string }) {
    const { password } = dto

    if (password) {
      const hashedPassword = await hash(password, 10)
      dto.password = hashedPassword
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { users, hashPassword } = this

    hashPassword(createUserDto)

    const user = await users.save(createUserDto)
    delete user.password

    return user
  }

  async findAll() {
    const { users } = this

    return await users.find({
      select: { id: true, name: true, lastName: true },
    })
  }

  async findOne(id: number) {
    const { users } = this

    const user = await users.findOneBy({ id })
    if (!user) throw new BadRequestException()

    return user
  }

  async findByEmail(email: string) {
    const { users } = this

    return await users.findOneBy({ email })
  }

  async findToLogin(email: string) {
    const { users } = this

    return await users.findOne({
      where: { email },
      select: { password: true, role: true },
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { users, findOne } = this

    await findOne(id)

    return await users.update(id, updateUserDto)
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    const { users, hashPassword } = this

    hashPassword(updateUserDto)

    return await users.update({ email }, updateUserDto)
  }

  async remove(id: number) {
    return `This action removes a #${id} user`
  }
}
