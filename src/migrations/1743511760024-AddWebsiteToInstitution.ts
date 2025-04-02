import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWebsiteToInstitution1743511760024 implements MigrationInterface {
    name = 'AddWebsiteToInstitution1743511760024'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution\` ADD \`website\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`institution\` ADD UNIQUE INDEX \`IDX_2f957de89d47ee5136a70e3a7b\` (\`website\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`institution\` DROP INDEX \`IDX_2f957de89d47ee5136a70e3a7b\``);
        await queryRunner.query(`ALTER TABLE \`institution\` DROP COLUMN \`website\``);
    }

}
