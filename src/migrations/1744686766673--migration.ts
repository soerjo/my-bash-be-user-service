import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744686766673 implements MigrationInterface {
    name = ' Migration1744686766673'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "trx_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "trx_id"`);
    }

}
