import { Currency } from 'src/currency/entities/currency.entity';
import { Role } from 'src/roles/role.entity';
import { User } from 'src/users/user.entity';
import { DataSource, MigrationInterface, QueryRunner } from 'typeorm';
import * as argon from 'argon2'

export class Seed2617378125550000 implements MigrationInterface {
  constructor(private dataSource: DataSource){}
  name = 'Seed2617378125550000';
public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`DELETE  FROM user`);
    await queryRunner.manager.insert<User>(User,[{firstName:'admin', lastName:'admin', phone_number:'0000', password: await argon.hash('password'), role:await queryRunner.manager.findOneBy<Role>(Role, {id:2})}]).then((data) => {
        console.log(data)
      })
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM user');
  
  }
}