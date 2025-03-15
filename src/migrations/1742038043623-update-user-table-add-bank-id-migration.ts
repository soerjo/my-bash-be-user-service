import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTableAddBankIdMigration1742038043623 implements MigrationInterface {
    name = 'UpdateUserTableAddBankIdMigration1742038043623'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "bank_id" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "bank_id"`);
    }

}
