import { MigrationInterface, QueryRunner } from "typeorm";

export class First1698746176120 implements MigrationInterface {
    name = 'First1698746176120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`currency\` (\`id\` int NOT NULL AUTO_INCREMENT, \`currency\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`phone_number\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`roleId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_wallet\` (\`id\` int NOT NULL AUTO_INCREMENT, \`balance\` int NOT NULL, \`wallet_id\` varchar(255) NOT NULL, \`userId\` int NULL, \`currencyId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`transaction\` (\`id\` int NOT NULL AUTO_INCREMENT, \`amount\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`uuid\` varchar(255) NOT NULL DEFAULT 'trans_169-874-617-642', \`senderWalletId\` int NULL, \`receiverWalletId\` int NULL, \`currencyId\` int NULL, UNIQUE INDEX \`IDX_fcce0ce5cc7762e90d2cc7e230\` (\`uuid\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD CONSTRAINT \`FK_f470cbcba8c6dbdaf32ac0d4267\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD CONSTRAINT \`FK_a4de9258bb189a50d3f99b0b186\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_3f062ad5434ca2ce2a1fc4e9494\` FOREIGN KEY (\`senderWalletId\`) REFERENCES \`user_wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_4d3780cb30b7e2f7949689e3b56\` FOREIGN KEY (\`receiverWalletId\`) REFERENCES \`user_wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_a6eb26abbedbeaeb81ff45c5490\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_a6eb26abbedbeaeb81ff45c5490\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_4d3780cb30b7e2f7949689e3b56\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_3f062ad5434ca2ce2a1fc4e9494\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP FOREIGN KEY \`FK_a4de9258bb189a50d3f99b0b186\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP FOREIGN KEY \`FK_f470cbcba8c6dbdaf32ac0d4267\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`DROP INDEX \`IDX_fcce0ce5cc7762e90d2cc7e230\` ON \`transaction\``);
        await queryRunner.query(`DROP TABLE \`transaction\``);
        await queryRunner.query(`DROP TABLE \`user_wallet\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`currency\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
