import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from '../infrastructure/controller/role.controller';
import { ROLE_REPOSITORY } from '../types/role.constants';
import { RolePrismaRepository } from '../infrastructure/repository/role-prisma.repository';

@Module({
  controllers: [RoleController],
  providers: [
    RoleService,
    {
      provide: ROLE_REPOSITORY,
      useClass: RolePrismaRepository,
    },
  ],
})
export class RoleModule {}
