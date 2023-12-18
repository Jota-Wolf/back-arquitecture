import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = context.switchToHttp().getRequest();
    return ctx;
  }
}
