import { UserRole } from '@prisma/client'

export interface ProtectedUserDto {
  id: number
  name: string
  lastName: string | null
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}
