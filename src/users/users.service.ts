import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { hash } from 'bcryptjs'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  private async hashPassword(dto: { password?: string }) {
    const { password } = dto

    if (password) {
      const hashedPassword = await hash(password, 10)
      dto.password = hashedPassword
    }
  }

  async create(createUserDto: CreateUserDto) {
    const { prisma, hashPassword } = this

    hashPassword(createUserDto)

    const user = await prisma.user.create({ data: createUserDto })
    delete user.password

    return user
  }

  async findAll() {
    const { prisma } = this

    return await prisma.user.findMany({
      select: { id: true, name: true, lastName: true },
    })
  }

  async findOne(id: number) {
    const { prisma } = this

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) throw new BadRequestException()

    return user
  }

  async findByEmail(email: string) {
    const { prisma } = this

    return await prisma.user.findUnique({ where: { email } })
  }

  async findByFullName(fullName: string) {
    const { prisma } = this

    return await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: fullName } },
          { lastName: { contains: fullName } },
        ],
      },
    })
  }

  async findToLogin(email: string) {
    const { prisma } = this

    return await prisma.user.findUnique({
      where: { email },
      select: { password: true, role: true },
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { prisma } = this

    return await prisma.user.update({ where: { id }, data: updateUserDto })
  }

  async updateByEmail(email: string, updateUserDto: UpdateUserDto) {
    const { prisma, hashPassword } = this

    hashPassword(updateUserDto)

    return await prisma.user.update({ where: { email }, data: updateUserDto })
  }

  async remove(id: number) {
    return `This action removes a #${id} user`
  }
}
