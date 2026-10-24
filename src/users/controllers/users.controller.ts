import { ConflictException, Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service.js';
import { Body, Post } from '@nestjs/common';
import { CreateUserDto } from '../dto/user.dto.js';
import { Public } from '@nestjs/authentication';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create-user')
  
  async createUser(@Body() p: CreateUserDto) {
    return await this.usersService.register(p);
  }
}
