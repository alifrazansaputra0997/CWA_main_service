import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from '../../dto/auth.dto.js';
import { CreateUserDto } from '@users/dto/user.dto.js';
import { UsersService } from '@users/services/users.service.js';
import { Public } from '@nestjs/authentication';
import { CredentialsService } from '../../services/credentials/credentials.service.js';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly credentialsService: CredentialsService,
  ) {}

  @Post('sign-up')
  @Public()
  async signUp(@Body() p: CreateUserDto) {
    return await this.usersService.register(p);
  }

  @Post('sign-in')
  @Public()
  async signIn(@Body() payload: SignUpDto) {
    const user = await this.credentialsService.verify(
      payload.email,
      payload.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
  }
}
