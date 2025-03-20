import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1742474202609 implements MigrationInterface {
    name = ' Migration1742474202609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user"."bank" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "code" character varying NOT NULL, "province" character varying NOT NULL, "regency" character varying NOT NULL, "district" character varying NOT NULL, "village" character varying NOT NULL, "address" text NOT NULL, "postal_code" character varying NOT NULL, "phone" character varying NOT NULL, "owner_id" integer NOT NULL, CONSTRAINT "UQ_11f196da2e68cef1c7e84b4fe94" UNIQUE ("name"), CONSTRAINT "UQ_efdd3f589f04cd21d79136de1aa" UNIQUE ("code"), CONSTRAINT "PK_7651eaf705126155142947926e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user"."bank" ADD CONSTRAINT "FK_7a9e45e78f3feb3b65914aadb58" FOREIGN KEY ("created_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."bank" ADD CONSTRAINT "FK_76a5895dddee76dcb93848ff680" FOREIGN KEY ("updated_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."bank" ADD CONSTRAINT "FK_7e7a1fc0c0d7243da0a52d179e1" FOREIGN KEY ("deleted_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."bank" DROP CONSTRAINT "FK_7e7a1fc0c0d7243da0a52d179e1"`);
        await queryRunner.query(`ALTER TABLE "user"."bank" DROP CONSTRAINT "FK_76a5895dddee76dcb93848ff680"`);
        await queryRunner.query(`ALTER TABLE "user"."bank" DROP CONSTRAINT "FK_7a9e45e78f3feb3b65914aadb58"`);
        await queryRunner.query(`DROP TABLE "user"."bank"`);
    }

}
