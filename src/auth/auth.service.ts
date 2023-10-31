import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private configService:ConfigService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      return {success:true, message:`User ${username} not found`}
    }
     if (await this.usersService.checkUserPassword(user?.password, pass)){
        console.log('yesss')
        const result = {id: user.id, email: user.email, role: user.role}
        const token = await this.createToken(result);
        return {...result, token: token}
     }
     console.log('noooo')
     return {success: false, message: "invalid credentials"}
    
  }

  async signUp(user): Promise<any> {
    const check = await this.usersService.findOne(user.email);
    if (check){
        throw new Error(`${user?.email} already exists`);
    }

    const createUser =  this.usersService.createUser(user);
    if (createUser){
        return {success: true, message: `${user.email} successfully created`}
    }

  }

  async createToken(user): Promise<any> {
    return {
      access_token: await this.jwtService.signAsync(user),
    };
  }
 
}