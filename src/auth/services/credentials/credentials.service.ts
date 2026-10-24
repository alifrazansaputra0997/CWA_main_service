import { PasswordHasher } from '@nestjs/authentication';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service.js';
import { CreateUserDto } from '@users/dto/user.dto.js';
import { UserRepository } from '@users/repository/users.repository.js';
import { Prisma, Users } from '@prisma-generated-client/prisma/client.js';
import { User } from '@users/interfaces/user.interface.js';

@Injectable()
export class CredentialsService {
  constructor(
    private readonly prisma: PrismaService,
    private usersRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async register(p: CreateUserDto) {
    const username = p.username;
    const email = p.email;

    const usernameIsAlreadyExist =
      await this.usersRepository.findByUsername(username);
    if (usernameIsAlreadyExist) {
      throw new ConflictException('Username already exists!');
    }

    const emailAlreadyExist = await this.usersRepository.findByEmail(email);
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
      return this.usersRepository.create(payload);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async verify(email: string, password: string): Promise<User | null> {
    const found = await this.usersRepository.findCredentials(email);
    const valid = await this.passwordHasher.verify(password, found?.password);
    if (!valid || !found?.password) {
      return null;
    }
    if (this.passwordHasher.needsRehash(found.password)) {
      await this.usersRepository.updatePasswordHash(
        found.id,
        await this.passwordHasher.hash(password),
      );
    }
    return found;
  }
}
