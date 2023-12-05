import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../infrastructure/controller/user.controller';
import { UserPrismaRepository } from '../infrastructure/repository/user-prisma.repository';
import { USER_REPOSITORY } from '../types/user.constants';
import { ROLE_REPOSITORY } from '../../role/types/role.constants';
import { RolePrismaRepository } from '../../role/infrastructure/repository/role-prisma.repository';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RolePrismaRepository,
    },
  ],
})
export class UserModule {}
