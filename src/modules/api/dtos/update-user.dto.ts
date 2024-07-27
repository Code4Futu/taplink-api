import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    @Transform(({ value }) => value.toLowerCase())
    address: string;
}
