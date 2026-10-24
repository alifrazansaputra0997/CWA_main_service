import { Module } from '@nestjs/common';
import { PrismaModule } from '@prisma-service/prisma.module.js';
import { UsersController } from './controllers/users.controller.js';
import { UsersService } from './services/users.service.js';
import { PasswordHasher } from '@nestjs/authentication';
import { UserRepository } from './repository/users.repository.js';
@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordHasher, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
