import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "../entities/user.entity";
import { Roles } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Reflector === Metadata del decorador @Roles()
    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    if (!roles || roles.length === 0) {
      return true; // Si el endpoint no requiere roles, deja pasar
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
console.log('>>> Usuario en request:', user);
    // Si no hay usuario o no tiene roles definidos, niega acceso
    if (!user || !user.userRoles) {
      return false;
    }

    return this.matchRoles(roles, user.userRoles);
  }

  private matchRoles(roles: string[], userRoles: string[] = []): boolean {
    return userRoles.some((userRole) =>
      roles.some((role) => role.toLowerCase() === userRole.toLowerCase()),
    );
  }

  
}
