import { MigrationInterface, QueryRunner } from "typeorm";

export class AddLatitudeAndLongitude1743515223045 implements MigrationInterface {
    name = 'AddLatitudeAndLongitude1743515223045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution_location\` ADD \`latitude\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`institution_location\` ADD \`longitude\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution_location\` DROP COLUMN \`longitude\``);
        await queryRunner.query(`ALTER TABLE \`institution_location\` DROP COLUMN \`latitude\``);
    }

}
