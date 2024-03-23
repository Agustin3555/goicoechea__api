import { RequestWithAuthUser } from '../interfaces/request-with-auth-user.interface'

export const extractToken = (request: RequestWithAuthUser) => {
  const [type, token] = request.headers.authorization?.split(' ') ?? []
  return type === 'Bearer' ? token : undefined
}
