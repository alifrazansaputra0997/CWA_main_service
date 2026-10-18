import { Controller, Post, Body } from '@nestjs/common';
import { CreateRoleDto, paramRoleDto } from '../dto/role.dto.js';

@Controller('role')
export class RoleController {
  @Post('create-role')
  async createRole(@Body() payload: CreateRoleDto) {

  }

  @Post('fetch-role')
  async fetchRole(@Body() payload: paramRoleDto){
    console.log('PAYLOAD', payload)
  }

}
