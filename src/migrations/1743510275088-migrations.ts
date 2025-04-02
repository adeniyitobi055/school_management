import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1743510275088 implements MigrationInterface {
    name = 'Migrations1743510275088'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`classes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`institutionId\` int NULL, UNIQUE INDEX \`IDX_1f3940af28a76098f31004f03c\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`institution_location\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`city\` varchar(255) NOT NULL, \`state\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`institutionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`institution\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NULL, \`address\` varchar(255) NOT NULL, \`headOfInstitution\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_d218ad3566afa9e396f184fd7d\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`institutionId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`classes\` ADD CONSTRAINT \`FK_d1ad914dfeba64ed9469f5f27e9\` FOREIGN KEY (\`institutionId\`) REFERENCES \`institution\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`institution_location\` ADD CONSTRAINT \`FK_d5489797a23becef479e9682cd4\` FOREIGN KEY (\`institutionId\`) REFERENCES \`institution\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_ca0de218397aed2409d865d1580\` FOREIGN KEY (\`institutionId\`) REFERENCES \`institution\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_ca0de218397aed2409d865d1580\``);
        await queryRunner.query(`ALTER TABLE \`institution_location\` DROP FOREIGN KEY \`FK_d5489797a23becef479e9682cd4\``);
        await queryRunner.query(`ALTER TABLE \`classes\` DROP FOREIGN KEY \`FK_d1ad914dfeba64ed9469f5f27e9\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`institutionId\``);
        await queryRunner.query(`DROP INDEX \`IDX_d218ad3566afa9e396f184fd7d\` ON \`institution\``);
        await queryRunner.query(`DROP TABLE \`institution\``);
        await queryRunner.query(`DROP TABLE \`institution_location\``);
        await queryRunner.query(`DROP INDEX \`IDX_1f3940af28a76098f31004f03c\` ON \`classes\``);
        await queryRunner.query(`DROP TABLE \`classes\``);
    }

}
