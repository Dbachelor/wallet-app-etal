// src/db/seeds/user.seeder.ts
import { Seeder, SeederFactoryManager, runSeeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Role } from 'src/roles/role.entity';
import { roles } from '../factories/role.factories';
import datasource, { dataSourceOptions } from 'datasource.config';

export default class RoleSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
   // await dataSource.query('TRUNCATE "role" RESTART IDENTITY;');
    const repository = dataSource.getRepository(Role);
    roles.map(async (role)=> {
        await repository.insert({
            name: role.name,
        });
    })
    
  }
}
