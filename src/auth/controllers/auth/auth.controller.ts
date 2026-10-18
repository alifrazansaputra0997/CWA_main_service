import { Controller, Post, Body } from '@nestjs/common';
import { SignUpDto } from '../../dto/auth.dto.js';

@Controller('auth')
export class AuthController {
    @Post('signIn')
    async signIn(@Body() payload: SignUpDto){
        
    }
}
