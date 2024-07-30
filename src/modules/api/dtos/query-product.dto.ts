import { ApiProperty } from '@nestjs/swagger';

export class QueryProductDto {
    @ApiProperty({
        required: false,
    })
    title?: string;
}
