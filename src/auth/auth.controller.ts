import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { STATUS_CODES } from 'http';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('/login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }


    @Post('/register')
    signUp(@Body() signUpDto: Record<string, any>) {
        return this.authService.signUp(signUpDto);
    }
}
