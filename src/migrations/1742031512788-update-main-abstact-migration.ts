import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMainAbstactMigration1742031512788 implements MigrationInterface {
    name = 'UpdateMainAbstactMigration1742031512788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."role" ADD CONSTRAINT "FK_04a09925beea59e864e921db4a1" FOREIGN KEY ("created_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."role" ADD CONSTRAINT "FK_858c871a036f61e56e2740c7cda" FOREIGN KEY ("updated_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."role" ADD CONSTRAINT "FK_7b5b6fdd043b90e1d461b4b681d" FOREIGN KEY ("deleted_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD CONSTRAINT "FK_d2f5e343630bd8b7e1e7534e82e" FOREIGN KEY ("created_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD CONSTRAINT "FK_6bfae5ab9f39212d5b6ad0276b1" FOREIGN KEY ("updated_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."user" ADD CONSTRAINT "FK_7dda804b73a73af1c4fcab9a5bc" FOREIGN KEY ("deleted_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."user" DROP CONSTRAINT "FK_7dda804b73a73af1c4fcab9a5bc"`);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP CONSTRAINT "FK_6bfae5ab9f39212d5b6ad0276b1"`);
        await queryRunner.query(`ALTER TABLE "user"."user" DROP CONSTRAINT "FK_d2f5e343630bd8b7e1e7534e82e"`);
        await queryRunner.query(`ALTER TABLE "user"."role" DROP CONSTRAINT "FK_7b5b6fdd043b90e1d461b4b681d"`);
        await queryRunner.query(`ALTER TABLE "user"."role" DROP CONSTRAINT "FK_858c871a036f61e56e2740c7cda"`);
        await queryRunner.query(`ALTER TABLE "user"."role" DROP CONSTRAINT "FK_04a09925beea59e864e921db4a1"`);
    }

}
