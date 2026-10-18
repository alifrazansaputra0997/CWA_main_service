import { ConflictException, Controller, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Put
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
    const usernameIsAlreadyExist = await this.usersService.findBuUsername({ username: username });
    if(!usernameIsAlreadyExist){
      throw new ConflictException('Username already exists!');
    };
    const payload:Prisma.UsersCreateInput = {
      name: String(p.name).toUpperCase(),
      isActive: true,
      password: await this.passwordHasher.hash(p.password),
      username: username
    };
    try{
    this.usersService.createUser(payload);
    } catch(err){
      throw new InternalServerErrorException(err);
    }
  }
}
