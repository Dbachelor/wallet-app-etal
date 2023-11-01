import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DataSource, Repository } from 'typeorm';
import * as argon from 'argon2'
import { Role } from 'src/roles/role.entity';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>, private rolesService: RolesService, private dataSource: DataSource){}

    async findOne(phone_number: string): Promise<User | undefined> {
        
        const user = await this.userRepository.findOne({
            where: {phone_number: phone_number},
            relations: ['role'],
          })
        if (! user){
            return undefined;
        }
        return user;
      }
    async checkUserPassword(_password: string, password: string): Promise<Boolean | undefined> {
        const checkPW = await argon.verify(_password, password);
        if (!checkPW) {
            return undefined;
        }
        return true;
    }

    async createUser(user: User): Promise<boolean | undefined> {
        await this.dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
            firstName: user.firstName,
            lastName: user.lastName,
            password: await argon.hash(user.password),
            role: await this.rolesService.findRole(1),
            phone_number: user.phone_number
          }).execute();
        return true;
    }

}
