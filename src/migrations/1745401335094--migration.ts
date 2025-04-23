import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745401335094 implements MigrationInterface {
    name = ' Migration1745401335094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" DROP CONSTRAINT "FK_7e85c24a62d649d683ec846a9e3"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" DROP CONSTRAINT "FK_490f21fa5f9fd6faa45e3a04885"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" ADD CONSTRAINT "FK_490f21fa5f9fd6faa45e3a04885" FOREIGN KEY ("attachment_id") REFERENCES "user"."email-attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" ADD CONSTRAINT "FK_7e85c24a62d649d683ec846a9e3" FOREIGN KEY ("amail_id") REFERENCES "user"."email-template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" DROP CONSTRAINT "FK_7e85c24a62d649d683ec846a9e3"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" DROP CONSTRAINT "FK_490f21fa5f9fd6faa45e3a04885"`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" ADD CONSTRAINT "FK_490f21fa5f9fd6faa45e3a04885" FOREIGN KEY ("attachment_id") REFERENCES "user"."email-template"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user"."email-template_email-attachment" ADD CONSTRAINT "FK_7e85c24a62d649d683ec846a9e3" FOREIGN KEY ("amail_id") REFERENCES "user"."email-attachment"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
