import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserPrismaRepository } from './repository/user-prisma.repository';
import { USER_REPOSITORY } from './user.constants';

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
