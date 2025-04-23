import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745412174031 implements MigrationInterface {
    name = ' Migration1745412174031'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user"."email-log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "email_template_name" character varying, "subject" character varying, "to" character varying, "payload" jsonb DEFAULT '{}', CONSTRAINT "PK_36152a433bf8ca39cb5b33560e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"."email-log"`);
    }

}
