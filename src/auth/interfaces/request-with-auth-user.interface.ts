import { FastifyRequest } from 'fastify'
import { UserRole } from '../../common/enums/user-role.enum'

export interface AuthUser {
  email: string
  role: UserRole
}

export interface RequestWithAuthUser extends FastifyRequest {
  user: AuthUser
}
