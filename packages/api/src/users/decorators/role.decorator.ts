import { Role } from "../entities/user.entity"
import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = "roles"

export const AllowedRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
