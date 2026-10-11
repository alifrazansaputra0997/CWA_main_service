import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './services/prisma/prisma.service.js';
import { UsersService } from './services/users/users.service.js';
import { UsersController } from './controllers/users/users.controller.js';
import configuration from '../config/configuration.js';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true
    }),
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, UsersService],
  exports: [PrismaService],
})
export class AppModule {}
