import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifiedWalletEntity1698681666300 implements MigrationInterface {
    name = 'ModifiedWalletEntity1698681666300'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`currency\` \`currencyId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP FOREIGN KEY \`FK_f470cbcba8c6dbdaf32ac0d4267\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`wallet_id\` \`wallet_id\` varchar(255) NOT NULL DEFAULT '1698-6816-6658-4'`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP COLUMN \`currencyId\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD \`currencyId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`date_of_transaction\` \`date_of_transaction\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD CONSTRAINT \`FK_f470cbcba8c6dbdaf32ac0d4267\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD CONSTRAINT \`FK_a4de9258bb189a50d3f99b0b186\` FOREIGN KEY (\`currencyId\`) REFERENCES \`currency\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP FOREIGN KEY \`FK_a4de9258bb189a50d3f99b0b186\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP FOREIGN KEY \`FK_f470cbcba8c6dbdaf32ac0d4267\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``);
        await queryRunner.query(`ALTER TABLE \`transaction\` CHANGE \`date_of_transaction\` \`date_of_transaction\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP()`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` DROP COLUMN \`currencyId\``);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD \`currencyId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`wallet_id\` \`wallet_id\` varchar(255) NOT NULL DEFAULT ''1698-6815-3445-5''`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` ADD CONSTRAINT \`FK_f470cbcba8c6dbdaf32ac0d4267\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`roleId\` \`roleId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_wallet\` CHANGE \`currencyId\` \`currency\` varchar(255) NOT NULL`);
    }

}
