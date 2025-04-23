import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745400575393 implements MigrationInterface {
    name = ' Migration1745400575393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user"."email-attachment" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "filename" character varying NOT NULL, "path" character varying NOT NULL, "cid" character varying NOT NULL, "email_id" integer NOT NULL, CONSTRAINT "PK_482b0c12a07ed86e1f5a5a8ef9f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user"."email-template" ("id" SERIAL NOT NULL, "created_by" integer, "updated_by" integer, "deleted_by" integer, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "html" text NOT NULL, "description" character varying, "subject" character varying, CONSTRAINT "PK_85f62c144b7cc9f777168bf0093" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user"."email-template_email-attachment" ("amail_id" integer NOT NULL, "attachment_id" integer NOT NULL, CONSTRAINT "PK_403ae4dd11e099a19c4d7e067f8" PRIMARY KEY ("amail_id", "attachment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e85c24a62d649d683ec846a9e" ON "user"."email-template_email-attachment" ("amail_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_490f21fa5f9fd6faa45e3a0488" ON "user"."email-template_email-attachment" ("attachment_id") `);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ADD CONSTRAINT "FK_88a1d9bed3360bd9b7d3b3a5a52" FOREIGN KEY ("created_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ADD CONSTRAINT "FK_95f61b2a8792d1b05134111c31f" FOREIGN KEY ("updated_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ADD CONSTRAINT "FK_c96df1bb40885727dd3887ad40e" FOREIGN KEY ("deleted_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" ADD CONSTRAINT "FK_480978ba3bd02cf0e680512d7c9" FOREIGN KEY ("created_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" ADD CONSTRAINT "FK_df9221feb4a62330b1862a38ce7" FOREIGN KEY ("updated_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" ADD CONSTRAINT "FK_abd34108608d9bb64600351acb9" FOREIGN KEY ("deleted_by") REFERENCES "user"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" ADD CONSTRAINT "FK_7e85c24a62d649d683ec846a9e3" FOREIGN KEY ("amail_id") REFERENCES "user"."email-attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" ADD CONSTRAINT "FK_490f21fa5f9fd6faa45e3a04885" FOREIGN KEY ("attachment_id") REFERENCES "user"."email-template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" DROP CONSTRAINT "FK_490f21fa5f9fd6faa45e3a04885"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" DROP CONSTRAINT "FK_7e85c24a62d649d683ec846a9e3"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" DROP CONSTRAINT "FK_abd34108608d9bb64600351acb9"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" DROP CONSTRAINT "FK_df9221feb4a62330b1862a38ce7"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" DROP CONSTRAINT "FK_480978ba3bd02cf0e680512d7c9"`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" DROP CONSTRAINT "FK_c96df1bb40885727dd3887ad40e"`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" DROP CONSTRAINT "FK_95f61b2a8792d1b05134111c31f"`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" DROP CONSTRAINT "FK_88a1d9bed3360bd9b7d3b3a5a52"`);
        await queryRunner.query(`DROP INDEX "user"."IDX_490f21fa5f9fd6faa45e3a0488"`);
        await queryRunner.query(`DROP INDEX "user"."IDX_7e85c24a62d649d683ec846a9e"`);
        await queryRunner.query(`DROP TABLE "user"."email-template_email-attachment"`);
        await queryRunner.query(`DROP TABLE "user"."email-template"`);
        await queryRunner.query(`DROP TABLE "user"."email-attachment"`);
    }

}
