import { ExecutionContext, Injectable, CanActivate } from "@nestjs/common";
import { Roles } from "../decorators/roles.decorator";
import { Reflector } from "@nestjs/core";
import { User } from "../entities/user.entity";
@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector){}


    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get(Roles, context.getHandler());
        if (!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: User = request.user
        return this.matchRoles(roles, user.userRoles)
    }

    matchRoles(roles: string[], userRoles: string[]){
        let access = false;
        userRoles.forEach((userRole)=> {
            if (roles.includes(userRole)) access = true
        })
        return access;
    }
}