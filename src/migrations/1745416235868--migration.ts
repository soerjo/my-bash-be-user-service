import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745416235868 implements MigrationInterface {
    name = ' Migration1745416235868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."notification" ADD "created_by" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."notification" DROP COLUMN "created_by"`);
    }

}
