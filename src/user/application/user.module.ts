import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from '../infrastructure/controller/user.controller';
import { UserPrismaRepository } from '../infrastructure/repository/user-prisma.repository';
import { USER_REPOSITORY } from '../types/user.constants';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
})
export class UserModule {}
