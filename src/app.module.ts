import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from '@prisma-service/prisma.module.js';
import { UsersModule } from '@users/users.module.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
