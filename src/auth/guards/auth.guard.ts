import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RequestWithAuthUser } from '../interfaces/request-with-auth-user.interface'
import { constants } from '../../constants'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithAuthUser>()

    const token = this.extractToken(request)
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

  private extractToken(request: RequestWithAuthUser) {
    const [type, token] = request.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
