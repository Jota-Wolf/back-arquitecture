import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/application/user.module';
import { RoleModule } from './role/application/role.module';
import { PrismaService } from './shared/services/prisma.service';
import { GlobalErrorExceptionFilter } from './shared/exceptions/global-error.exception';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: GlobalErrorExceptionFilter,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
