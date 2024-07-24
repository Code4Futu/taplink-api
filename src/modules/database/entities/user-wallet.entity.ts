import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class UserWallet extends BaseEntity {
    @ApiProperty()
    @Column({ unique: true })
    @Index()
    address: string;

    @ApiProperty()
    @Column('int')
    nonce: number;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;
}
