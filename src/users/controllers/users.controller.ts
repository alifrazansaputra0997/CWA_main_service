import {
  ConflictException,
  Controller,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Put,
} from '@nestjs/common';
import {
  UsersModel,
  UsersWhereInput,
  UsersWhereUniqueInput,
} from '@prisma-generated-client/prisma/models.js';
import { contain } from 'supertest/lib/cookies.js';
import { CreateUserDto } from '../dto/user.dto.js';
import { Prisma } from '../../generated/prisma/client.js';
import { PasswordHasher } from '@nestjs/authentication';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  @Post('/create-user')
  async createUser(@Body() p: CreateUserDto) {
    const username = p.username;
    const email = p.email;

    const usernameIsAlreadyExist = await this.usersService.findByUsername(username);
    if (usernameIsAlreadyExist) {
      throw new ConflictException('Username already exists!');
    }

    const emailAlreadyExist = await this.usersService.findByEmail(email);
    if (emailAlreadyExist) {
      throw new ConflictException('Email already exists!');
    }

    const payload: Prisma.UsersCreateInput = {
      name: p.name.trim().toUpperCase(),
      isActive: true,
      password: await this.passwordHasher.hash(p.password),
      username: username,
      email: email,
    };
    
    try {
      return this.usersService.createUser(payload);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
