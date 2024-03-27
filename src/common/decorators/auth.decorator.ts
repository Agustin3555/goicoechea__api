import { applyDecorators, UseGuards } from '@nestjs/common'
import { UserRole } from '@prisma/client'
import { Roles } from '../../auth/decorators/roles.decorator'
import { AuthGuard } from '../../auth/guards/auth.guard'
import { RolesGuard } from '../../auth/guards/roles.guard'

export function Auth(...roles: UserRole[]) {
  return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard))
}
