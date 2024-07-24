import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class GetNonceDto {
    @ApiProperty()
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    address: string;
}
