import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745415123034 implements MigrationInterface {
    name = ' Migration1745415123034'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user"."notification-log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "notification_id" uuid NOT NULL, "user_id" character varying, CONSTRAINT "REL_239c43d1cb6aa55f5fcad5f909" UNIQUE ("notification_id"), CONSTRAINT "PK_50c19ebb7f700629e24b37a20f0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user"."notification" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "tag" character varying, "subject" character varying, "message" character varying, "user_id" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user"."notification-log" ADD CONSTRAINT "FK_239c43d1cb6aa55f5fcad5f909f" FOREIGN KEY ("notification_id") REFERENCES "user"."notification"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."notification-log" DROP CONSTRAINT "FK_239c43d1cb6aa55f5fcad5f909f"`);
        await queryRunner.query(`DROP TABLE "user"."notification"`);
        await queryRunner.query(`DROP TABLE "user"."notification-log"`);
    }

}
