import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UserWallet } from './user-wallet.entity';

export enum Role {
    TIER_1,
    TIER_2,
    TIER_3,
    TIER_4,
}

@Entity()
export class User extends BaseEntity {
    @ApiProperty()
    @Column()
    username: string;

    @ApiProperty({ enum: Role })
    @Column({
        type: 'enum',
        enum: Role,
    })
    role: Role;

    @OneToOne(() => UserWallet, {
        cascade: true,
    })
    @JoinColumn()
    wallet: UserWallet;
}
