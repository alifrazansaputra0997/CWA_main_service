import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service.js';
import { Prisma, Users } from '../../generated/prisma/client.js';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(userID: number) {
    return this.prisma.users.findUnique({
      where: { id: userID },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        isActive: true,
      },
    });
  }

  async create(payload: Prisma.UsersCreateInput): Promise<any> {
    return this.prisma.users.create({
      data: payload,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        isActive: true,
        password: false,
      },
    });
  }

  async findByUsername(username: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { username: username },
    });
  }

  async findByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { email: email },
    });
  }

  async findCredentials(email: string): Promise<Users | null> {
    const normalized = normalize(email);
    return this.prisma.users.findUnique({
      where: { email: normalized },
    });
  }

  async updatePasswordHash(userId: any, passwordHash: string) {
    return this.prisma.users.update({
      data: {
        password: passwordHash,
      },
      where: {
        id: userId,
      },
    });
  }
}
const normalize = (email: string) =>
  email.trim().normalize('NFC').toLowerCase();
