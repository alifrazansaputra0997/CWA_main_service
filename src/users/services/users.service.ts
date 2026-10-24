import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service.js';
import { Prisma, Users } from '../../generated/prisma/client.js';
import { CreateUserDto } from '@users/dto/user.dto.js';
import { UserRepository } from '@users/repository/users.repository.js';
import { PasswordHasher } from '@nestjs/authentication';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async register(p: CreateUserDto) {
    const username = p.username;
    const email = p.email;

    const usernameIsAlreadyExist =
      await this.userRepo.findByUsername(username);
    if (usernameIsAlreadyExist) {
      throw new ConflictException('Username already exists!');
    }

    const emailAlreadyExist = await this.userRepo.findByEmail(email);
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
      return this.userRepo.create(payload);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
