import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744381241481 implements MigrationInterface {
    name = ' Migration1744381241481'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" ADD "warehouse" integer`);
        await queryRunner.query(`ALTER TABLE "user"."user" ALTER COLUMN "bank_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."user" ALTER COLUMN "bank_id" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" ALTER COLUMN "bank_id" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "user"."user" ALTER COLUMN "bank_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP COLUMN "warehouse"`);
    }

}
