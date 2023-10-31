import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from 'src/users/user.entity';
import { users } from '../factories/user.factory';
import * as argon from 'argon2'
import { findValue } from '../helper';
import datasource from 'datasource.config';


export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    //await dataSource.query('TRUNCATE "user" RESTART IDENTITY;');

    const repository = dataSource.getRepository(User);
    users.map(async(user)=>{
         await dataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values({
            firstName: user.firstName,
            lastName: user.lastName,
            password: await argon.hash(user.password),
            role: await findValue(User, user.roleId),
            email: user.email
          }).execute();
    })
   
  }
}
