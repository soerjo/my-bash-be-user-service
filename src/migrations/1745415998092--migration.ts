import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745415998092 implements MigrationInterface {
    name = ' Migration1745415998092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."notification-log" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user"."notification-log" ADD "user_id" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."notification-log" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "user"."notification-log" ADD "user_id" character varying NOT NULL`);
    }

}
