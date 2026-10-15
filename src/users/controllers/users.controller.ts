import { Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  UsersModel,
  UsersWhereInput,
  UsersWhereUniqueInput,
} from '@prisma-generated-client/prisma/models.js';
import { contain } from 'supertest/lib/cookies.js';
import { CreateUserDto } from '../dto/user.dto.js';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-user')
  async createUser(@Body() payload: CreateUserDto) {
    console.log('payload', payload)
  }
}
