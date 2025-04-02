import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateInstitutionLocation1743527949897 implements MigrationInterface {
    name = 'UpdateInstitutionLocation1743527949897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution_location\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`institution_location\` ADD \`latitude\` decimal(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`institution_location\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`institution_location\` ADD \`longitude\` decimal(10) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution_location\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`institution_location\` ADD \`longitude\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`institution_location\` DROP COLUMN \`latitude\``);
        await queryRunner.query(`ALTER TABLE \`institution_location\` ADD \`latitude\` int NOT NULL`);
    }

}
