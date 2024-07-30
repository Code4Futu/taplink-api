import { Role } from '@/database/entities';
import { ApiProperty } from '@nestjs/swagger';

export class QueryUserDto {
    @ApiProperty({
        required: false,
        name: 'role',
        enum: Role,
    })
    role?: Role;
}
