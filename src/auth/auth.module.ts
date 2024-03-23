import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { constants } from '../common/constants'

const { secret, expiresIn } = constants.jwt

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ global: true, secret, signOptions: { expiresIn } }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
