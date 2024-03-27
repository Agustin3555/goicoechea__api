import { FastifyRequest } from 'fastify'
import { UserRole } from '@prisma/client'

export interface AuthUser {
  email: string
  role: UserRole
}

export interface RequestWithAuthUser extends FastifyRequest {
  user: AuthUser
}
