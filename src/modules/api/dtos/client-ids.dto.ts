import { ApiProperty } from '@nestjs/swagger';

export class ClientIdsDto {
    @ApiProperty()
    ids: string[];
}
