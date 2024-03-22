import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { compare } from 'bcryptjs'
import { AuthUser } from './interfaces/request-with-auth-user.interface'
import { UpdateUserDto } from '../users/dto/update-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const { email } = createUserDto

    const user = await this.usersService.findByEmail(email)
    if (user) throw new BadRequestException('Email already exists')

    return await this.usersService.create(createUserDto)
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findToLogin(loginDto.email)
    if (!user) throw new UnauthorizedException('Invalid email')

    const { password, role } = user

    const isPasswordValid = await compare(loginDto.password, password)
    if (!isPasswordValid) throw new UnauthorizedException('Invalid password')

    const payload: AuthUser = { email: loginDto.email, role }
    const token = await this.jwtService.signAsync(payload)

    return { token }
  }

  async me(email: string) {
    return await this.usersService.findByEmail(email)
  }

  async updateMe(email: string, updateUserDto: UpdateUserDto) {
    return await this.usersService.updateByEmail(email, updateUserDto)
  }
}
