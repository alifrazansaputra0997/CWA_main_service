import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from '@prisma-service/prisma.module.js';
import { UsersModule } from '@users/users.module.js';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module.js';
import { AuthModule } from './auth/auth.module.js';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './interceptors/response/response.interceptor.js';
import { GlobalExceptionInterceptor } from './interceptors/global-exception/global-exception.interceptor.js';
import { AuthenticationModule } from '@nestjs/authentication';

@Module({
  imports: [
    AuthenticationModule.forRoot({
      session: {
        absoluteTtl: '2d', // Session akan kadarluarsa di hari ke 2
        idleTtl: '1d' // Session akan dipaksa kadarluarsa jika 1 hari tidak ada aktivitas
      }
    }),
    PrismaModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true
    }),
    RoleModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionInterceptor
    },
    AppService],
  exports: [],
})
export class AppModule {}
