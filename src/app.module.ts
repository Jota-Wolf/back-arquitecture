import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/application/user.module';
import { RoleModule } from './role/application/role.module';
import { PrismaService } from './shared/services/prisma.service';
import { GlobalErrorExceptionFilter } from './shared/exceptions/global-error.exception';
import { AuthModule } from './auth/application/auth.module';
import { AccessTokenGuard } from './auth/infrastructure/guards/accessToken.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoleModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: GlobalErrorExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  exports: [PrismaService],
})
export class AppModule {}
