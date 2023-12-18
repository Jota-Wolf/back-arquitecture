import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthPublicController } from '../infrastructure/controllers/auth-public.controller';
import { UserService } from '../../user/application/user.service';
import { USER_REPOSITORY } from '../../user/types/user.constants';
import { UserPrismaRepository } from '../../user/infrastructure/repository/user-prisma.repository';
import { ROLE_REPOSITORY } from '../../role/types/role.constants';
import { RolePrismaRepository } from '../../role/infrastructure/repository/role-prisma.repository';
import { AUTH_SERVICE, TOKEN_SERVICE } from '../types/auth.constants';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from '../infrastructure/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../infrastructure/strategies/refreshToken.strategy';
import { RoleService } from '../../role/application/role.service';

@Module({
  controllers: [AuthPublicController],
  providers: [
    AuthService,
    UserService,
    RoleService,
    JwtService,
    TokenService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RolePrismaRepository,
    },
    {
      provide: TOKEN_SERVICE,
      useClass: TokenService,
    },
    {
      provide: AUTH_SERVICE,
      useClass: AuthService,
    },
  ],
})
export class AuthModule {}
