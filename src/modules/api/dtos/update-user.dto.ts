import { Role } from '@/database/entities';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty({
        enumName: 'role',
        enum: Role,
    })
    @IsNotEmpty()
    role: Role;
}
