import { MigrationInterface, QueryRunner } from "typeorm";

export class Auth1721492294436 implements MigrationInterface {
    name = 'Auth1721492294436'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "username" character varying NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "nonce" integer NOT NULL, "userId" uuid, CONSTRAINT "REL_f470cbcba8c6dbdaf32ac0d426" UNIQUE ("userId"), CONSTRAINT "PK_b453ec3d9d579f6b9699be98beb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ac2af862c8540eccb210b29310" ON "user_wallet" ("address") `);
        await queryRunner.query(`ALTER TABLE "user_wallet" ADD CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_wallet" DROP CONSTRAINT "FK_f470cbcba8c6dbdaf32ac0d4267"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ac2af862c8540eccb210b29310"`);
        await queryRunner.query(`DROP TABLE "user_wallet"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
