import { Module } from '@nestjs/common';
import { RoleService } from './services/role/role.service.js';
import { RoleController } from './controllers/role.controller.js';
import { PrismaModule } from '@prisma-service/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
