import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { Auth } from '../common/decorators/auth.decorator'
import { UserRole } from '@prisma/client'
import { ExtractAuthUser } from '../common/decorators/extract-auth-user.decorator'
import { AuthUser } from '../common/interfaces/request-with-auth-user.interface'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { UpdateUserDto } from '../users/dto/update-user.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(UserRole.ADMIN)
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @Get('me')
  @Auth(UserRole.ADMIN, UserRole.EMPLOYEE)
  async me(@ExtractAuthUser() user?: AuthUser) {
    const { email } = user

    return this.authService.me(email)
  }

  @Patch('me')
  @Auth(UserRole.ADMIN, UserRole.EMPLOYEE)
  async updateMe(
    @Body() updateUserDto: UpdateUserDto,
    @ExtractAuthUser() user?: AuthUser,
  ) {
    const { email } = user

    return this.authService.updateMe(email, updateUserDto)
  }
}
