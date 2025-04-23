import { MigrationInterface, QueryRunner } from "typeorm";

export class  Migration1745400798909 implements MigrationInterface {
    name = ' Migration1745400798909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" DROP COLUMN "email_id"`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ALTER COLUMN "filename" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ALTER COLUMN "path" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ALTER COLUMN "cid" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" ALTER COLUMN "name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" ALTER COLUMN "html" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user"."email-template" ALTER COLUMN "html" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-template" ALTER COLUMN "name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ALTER COLUMN "cid" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ALTER COLUMN "path" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ALTER COLUMN "filename" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user"."email-attachment" ADD "email_id" integer NOT NULL`);
    }

}
