import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1722351360037 implements MigrationInterface {
    name = 'Init1722351360037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "nonce" integer NOT NULL, CONSTRAINT "UQ_ac2af862c8540eccb210b293107" UNIQUE ("address"), CONSTRAINT "PK_b453ec3d9d579f6b9699be98beb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_ac2af862c8540eccb210b29310" ON "user_wallet" ("address") `);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('0', '1', '2', '3')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL, "walletId" uuid, CONSTRAINT "REL_922e8c1d396025973ec81e2a40" UNIQUE ("walletId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."product_state_enum" AS ENUM('0', '1', '2')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "title" character varying NOT NULL, "brand" character varying NOT NULL, "type" character varying, "quantity" integer, "colors" text array, "country" character varying, "manufactoringDate" TIMESTAMP, "description" character varying NOT NULL, "featureImage" character varying NOT NULL, "additionalImages" text array, "state" "public"."product_state_enum" NOT NULL DEFAULT '0', CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "logo" character varying NOT NULL, "name" character varying NOT NULL, "address" character varying NOT NULL, "numOfItemCredits" integer NOT NULL, "kycVerified" boolean NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "otherInfo" character varying, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "addressLine1" character varying NOT NULL, "addressLine2" character varying NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "postalCode" character varying NOT NULL, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "user_wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_state_enum"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac2af862c8540eccb210b29310"`);
        await queryRunner.query(`DROP TABLE "user_wallet"`);
    }

}
