import { Controller } from '@nestjs/common';
import { UsersService } from '../../services/users/users.service.js';
import {
  Body,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UsersModel, UsersWhereInput, UsersWhereUniqueInput } from '../../generated/prisma/models.js';
import { contain } from 'supertest/lib/cookies.js';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
}
