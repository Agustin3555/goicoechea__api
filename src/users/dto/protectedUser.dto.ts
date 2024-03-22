import { UserRole } from '../../common/enums/user-role.enum'

export interface ProtectedUserDto {
  id: number
  name: string
  lastName: string | null
  email: string
  role: UserRole
  createdAt: string
  updatedAt: string
}
