import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RequestWithAuthUser } from '../../common/interfaces/request-with-auth-user.interface'
import { extractToken } from '../../common/helpers/extract-token.helper'
import { constants } from '../../common/constants'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAuthUser>()

    const token = extractToken(request)
    if (!token) throw new UnauthorizedException()

    const { secret } = constants.jwt

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret })
      request.user = payload
    } catch (error) {
      throw new UnauthorizedException()
    }

    return true
  }
}
