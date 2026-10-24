import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller.js';
import { AuthService } from './services/auth/auth.service.js';
import { SessionAuthService } from './services/session-auth/session-auth.service.js';
import { PrismaService } from '@prisma-service/prisma.service.js';
import { UserRepository } from '@users/repository/users.repository.js';
import { CredentialsService } from './services/credentials/credentials.service.js';
import { UsersService } from '@users/services/users.service.js';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService, 
    SessionAuthService, 
    PrismaService, 
    UserRepository, 
    CredentialsService,
    UsersService
  ],
  exports: [
    UserRepository, 
    SessionAuthService,
    
  ]
})
export class AuthModule {}


// Alur session 
// Client mengirim session cookie -> sessionCookieProvider -> SessionAuth.validate() -> userRepositofy -> prisma -> user valid