import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1742478958942 implements MigrationInterface {
    name = ' Migration1742478958942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."bank" ADD CONSTRAINT "FK_7f88aa92fff42d8ff9ddea35324" FOREIGN KEY ("owner_id") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."bank" DROP CONSTRAINT "FK_7f88aa92fff42d8ff9ddea35324"`);
    }

}
