import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service.js';
import { Prisma, Users } from '../../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(payload: Prisma.UsersCreateInput): Promise<Users> {
    return this.prisma.users.create({ 
      data: payload,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        isActive: true
      }
     });
  }

  async findByUsername(username: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { username: username },
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { email: email }
    });
  }
}
