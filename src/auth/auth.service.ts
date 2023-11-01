import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotFoundError } from 'rxjs';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private configService:ConfigService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return {success:true, message:`User ${username} not found`}
    }
     if (await this.usersService.checkUserPassword(user?.password, pass)){
        const result = {sub: user.id, phone_number: user.phone_number, role: user.role.id}
        const token = await this.createToken(result);
        return {...result, token: token}
     }
     return {success: false, message: "invalid credentials"}
    
  }

  async signUp(user): Promise<any> {
    const check = await this.usersService.findOne(user.phone_number);
    if (check){
        return {success: false, message:`${user?.phone_number} already exists`};
    }

    const createUser =  this.usersService.createUser(user);
    if (createUser){
        return {success: true, message: `${user.phone_number} successfully created`}
    }

  }

  async createToken(payload): Promise<any> {
    return {
      access_token: await this.jwtService.signAsync(payload, {secret:this.configService.get('SECRET')}),
    };
  }
 
}