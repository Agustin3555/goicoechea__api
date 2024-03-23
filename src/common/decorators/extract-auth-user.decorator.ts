import {
  ExecutionContext,
  createParamDecorator,
  Injectable,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { RequestWithAuthUser } from '../interfaces/request-with-auth-user.interface'
import { constants } from '../constants'
import { extractToken } from '../helpers/extract-token.helper'

@Injectable()
class AuthUserExtractionService {
  constructor(private readonly jwtService: JwtService) {}

  async getUserFromToken(request: RequestWithAuthUser) {
    const token = extractToken(request)
    if (!token) return undefined

    const { secret } = constants.jwt

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret })
      return payload
    } catch (error) {
      return undefined
    }
  }
}

export const ExtractAuthUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithAuthUser>()

    const userFromRequest = request.user
    if (userFromRequest) return userFromRequest

    const authUserDecoratorService = new AuthUserExtractionService(
      new JwtService(),
    )

    const userFromToken =
      await authUserDecoratorService.getUserFromToken(request)

    if (userFromToken) {
      request.user = userFromToken
      return userFromToken
    }

    return undefined
  },
)
