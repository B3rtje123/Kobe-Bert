import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common"
import { Reflector } from "@nestjs/core"
import { UsersService } from "../users.service"
import { GqlExecutionContext } from "@nestjs/graphql"
import { Role } from "../entities/user.entity"
import { ROLES_KEY } from "../decorators/role.decorator"

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ])

    if (!requiredRoles) throw new Error("No roles defined")
    
    const ctx = GqlExecutionContext.create(context)
    const { user } = ctx.getContext().req
    const { role } = await this.usersService.findOneByUid(user.uid)
    console.log(role)
    console.log(requiredRoles)
    return requiredRoles.includes(role)
  }
}
