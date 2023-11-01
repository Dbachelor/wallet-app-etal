import { Currency } from 'src/currency/entities/currency.entity';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import { DataSource, MigrationInterface, QueryRunner } from 'typeorm';

export class Seed26173781255000 implements MigrationInterface {
  constructor(private datasource: DataSource){}
  name = 'Seed26173781255000';
  public currencies = ['NGN', 'USD', 'GBP', 'EUR',];
  public roles = ['user', 'admin'];
  public admin  = [{
    phone_number:"0000",
    password:"password",
    firstName: "admin",
    lastName: "admin"
}]
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE  FROM currency`);
    await queryRunner.query(`DELETE  FROM role`);
    
    await queryRunner.manager.insert<Currency>(Currency,[{currency:'NGN'}, {currency:'USD'}, {currency:'GBP'}, {currency:'EUR'}]).then((data) => {
      console.log(data)
    })

    await queryRunner.manager.insert<Role>(Role,[{name:'user'}, {name:'admin'}]).then((data) => {
      console.log(data)
    })



    this.roles.map(async (role)=> {
      await 
        queryRunner.manager.create<Role>(Role, {
          name: role
        })

    })
  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(`DELETE  FROM currency`);
    await queryRunner.query(`DELETE  FROM role`);
  }
}