import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Request,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Auth } from '../common/decorators/auth.decorator'
import { UserRole } from '../common/enums/user-role.enum'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { RequestWithAuthUser } from './interfaces/request-with-auth-user.interface'
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
  async me(@Request() req: RequestWithAuthUser) {
    const { email } = req.user

    return this.authService.me(email)
  }

  @Patch('me')
  @Auth(UserRole.ADMIN, UserRole.EMPLOYEE)
  async updateMe(
    @Request() req: RequestWithAuthUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { email } = req.user

    return this.authService.updateMe(email, updateUserDto)
  }
}
