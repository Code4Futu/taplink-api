import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1722064683973 implements MigrationInterface {
    name = 'Init1722064683973'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "companyName" character varying, "role" "public"."user_role_enum" NOT NULL DEFAULT '1', CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "nonce" integer NOT NULL, "userId" uuid, CONSTRAINT "UQ_ac2af862c8540eccb210b293107" UNIQUE ("address"), CONSTRAINT "REL_f470cbcba8c6dbdaf32ac0d426" UNIQUE ("userId"), CONSTRAINT "PK_b453ec3d9d579f6b9699be98beb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac2af862c8540eccb210b29310" ON "user_wallet" ("address") `);
        await queryRunner.query(`CREATE TYPE "public"."product_state_enum" AS ENUM('0', '1')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "brand" character varying NOT NULL, "type" character varying, "quantity" integer, "colors" text array, "country" character varying, "manufactoringDate" TIMESTAMP, "description" character varying NOT NULL, "featureImage" character varying NOT NULL, "additionalImages" text array, "state" "public"."product_state_enum" NOT NULL DEFAULT '0', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_state_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac2af862c8540eccb210b29310"`);
        await queryRunner.query(`DROP TABLE "user_wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
    }

}
