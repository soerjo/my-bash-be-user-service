import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745415151655 implements MigrationInterface {
    name = ' Migration1745415151655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."notification-log" ALTER COLUMN "user_id" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."notification-log" ALTER COLUMN "user_id" DROP NOT NULL`);
    }

}
