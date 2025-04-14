import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1744381851479 implements MigrationInterface {
    name = ' Migration1744381851479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" RENAME COLUMN "warehouse" TO "warehouse_id"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" RENAME COLUMN "warehouse_id" TO "warehouse"`);
    }

}
