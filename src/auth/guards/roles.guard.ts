import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ROLES_KEY } from '../decorators/roles.decorator'
import { UserRole } from '@prisma/client'
import { RequestWithAuthUser } from '../../common/interfaces/request-with-auth-user.interface'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!roles) return true

    const { user } = context.switchToHttp().getRequest<RequestWithAuthUser>()

    // /*
    //   Se establece una estrategia que otorga acceso a todos los endpoints de la
    //   API si el usuario tiene el rol de SUPER_ADMIN.
    // */
    // if (user.role === UserRole.SUPER_ADMIN) return true

    return roles.includes(user.role)
  }
}
