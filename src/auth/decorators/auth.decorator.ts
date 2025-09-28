import { applyDecorators, UseGuards } from "@nestjs/common";
import { ROLES } from "../constants/roles.constants";
import { AuthGuard } from "../guards/auth.guard";
import { RolesGuard } from "../guards/roles.guards";
import { Roles } from "./roles.decorator";

export const Auth = ( ...roles: ROLES[])=> {
    roles.push(ROLES.ADMIN);
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard)
    )

}