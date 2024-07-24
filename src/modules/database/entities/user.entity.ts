import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('users')
export class User extends BaseEntity {
    @ApiProperty()
    @Column({
        unique: true,
    })
    username: string;

    // @ApiProperty({ enum: Role })
    // @Column({
    //     type: 'enum',
    //     enum: Role,
    //     default: Role.NO_PERMISSION,
    // })
    // role: Role;
}
