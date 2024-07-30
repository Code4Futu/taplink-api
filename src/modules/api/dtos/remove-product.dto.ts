import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RemoveProductDto {
    @ApiProperty()
    @IsNotEmpty()
    ids: string[];
}
