import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './Dto/auth.dto';
import { RegisterDTO } from './Dto/register.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('/login')
    signIn(@Body() signInDto: AuthDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }


    @Post('/register')
    signUp(@Body() signUpDto: RegisterDTO) {
        return this.authService.signUp(signUpDto);
    }
}
