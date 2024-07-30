import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class UserWallet extends BaseEntity {
    @ApiProperty()
    @Column({ unique: true })
    @Index()
    address: string;

    @ApiProperty()
    @Column('int')
    nonce: number;
}
