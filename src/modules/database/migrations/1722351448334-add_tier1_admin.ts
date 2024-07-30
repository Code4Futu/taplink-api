import { MigrationInterface, QueryRunner } from 'typeorm';
import { Role, User, UserWallet } from '../entities';

export class AddTier1Admin1722351448334 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const wallet = await queryRunner.manager.save(UserWallet, {
            address: '0x9f888B60DC976e7147D2aBABC2D87aB0D306B2f4'.toLowerCase(),
            nonce: 100000,
        });

        await queryRunner.manager.save(User, {
            username: 'Tier 1 admin',
            role: Role.TIER_1,
            wallet,
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
