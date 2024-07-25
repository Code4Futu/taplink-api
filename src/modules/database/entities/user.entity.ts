import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

export enum Role {
    TIER_1,
    TIER_2,
    TIER_3,
    TIER_4,
}

@Entity()
export class User extends BaseEntity {
    @ApiProperty()
    @Column({
        unique: true,
    })
    username: string;

    @ApiProperty()
    @Column({
        nullable: true,
    })
    companyName: string;

    @ApiProperty({ enum: Role })
    @Column({
        type: 'enum',
        enum: Role,
        default: Role.TIER_2,
    })
    role: Role;
}
