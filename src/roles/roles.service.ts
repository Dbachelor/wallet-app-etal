import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolesService {

    constructor(@InjectRepository(Role)private rolesRepository: Repository<Role>){

    }

    async findRole(id){
        return await this.rolesRepository.findOneBy({id:id})
    }
}
