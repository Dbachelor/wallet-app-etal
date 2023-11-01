import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifiedTransactionUuid1698747069419 implements MigrationInterface {
    name = 'ModifiedTransactionUuid1698747069419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP FOREIGN KEY \`FK_f470cbcba8c6dbdaf32ac0d4267\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP FOREIGN KEY \`FK_a4de9258bb189a50d3f99b0b186\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`currencyId\` \`currencyId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_3f062ad5434ca2ce2a1fc4e9494\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_4d3780cb30b7e2f7949689e3b56\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` DROP FOREIGN KEY \`FK_a6eb26abbedbeaeb81ff45c5490\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`date\` \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`uuid\` \`uuid\` varchar(255) NOT NULL DEFAULT 'trans_169-874-706-97'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`senderWalletId\` \`senderWalletId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`receiverWalletId\` \`receiverWalletId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`currencyId\` \`currencyId\` int NULL`);
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
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`currencyId\` \`currencyId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`receiverWalletId\` \`receiverWalletId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`senderWalletId\` \`senderWalletId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`uuid\` \`uuid\` varchar(255) NOT NULL DEFAULT ''trans_169-874-685-901-0''`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`date\` \`date\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_a6eb26abbedbeaeb81ff45c5490\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_4d3780cb30b7e2f7949689e3b56\` FOREIGN KEY (\`receiverWalletId\`) REFERENCES \`user_wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transaction\` ADD CONSTRAINT \`FK_3f062ad5434ca2ce2a1fc4e9494\` FOREIGN KEY (\`senderWalletId\`) REFERENCES \`user_wallet\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`currencyId\` \`currencyId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD CONSTRAINT \`FK_a4de9258bb189a50d3f99b0b186\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD CONSTRAINT \`FK_f470cbcba8c6dbdaf32ac0d4267\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
