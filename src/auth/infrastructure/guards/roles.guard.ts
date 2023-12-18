import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { RoleEnum } from '../../../role/types/role.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly roles: RoleEnum[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const userReq = context.switchToHttp().getRequest().user;

    if (!userReq) {
      throw new InternalServerErrorException('User not found in request');
    }

    if (this.roles.length === 0) return true;
    const hasRole = this.roles.includes(userReq.role.name);
    if (!hasRole) {
      throw new ForbiddenException('You do not have permission');
    }
    return true;
  }
}
