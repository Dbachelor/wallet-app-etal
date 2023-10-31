import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.email, signInDto.password);
      }

    @Post('/register')
    signUp(@Body() signUpDto: Record<string, any>) {
        return this.authService.signUp(signUpDto);
    }
}