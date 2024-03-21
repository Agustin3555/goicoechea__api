import { UserRole } from '../entities/user.entity'

export interface ProtectedUserDto {
  name: string
  lastName: string | null
  email: string
  role: UserRole
}
