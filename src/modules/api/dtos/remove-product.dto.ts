import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class RemoveProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    ids: string[];
}
