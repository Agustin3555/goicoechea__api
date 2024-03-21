import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { hash, compare } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, lastName, email, password, role }: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(email)
    if (user) throw new BadRequestException('Email already exists')

    const hashedPassword = await hash(password, 10)

    return await this.usersService.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      role,
    })
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOneByEmail(loginDto.email)
    if (!user) throw new UnauthorizedException('Invalid email')

    const { id, email, password } = user

    const isPasswordValid = await compare(loginDto.password, password)
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

    const payload = { id, email }
    const token = await this.jwtService.signAsync(payload)

    return { token, user: this.usersService.asProtectedUser(user) }
  }

  async me(id: number) {
    return await this.usersService.findOne(id)
  }
}
