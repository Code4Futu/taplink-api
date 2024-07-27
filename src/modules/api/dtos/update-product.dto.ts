import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty()
    title: string;

    @ApiProperty()
    brand: string;

    @ApiProperty()
    type: string;

    @ApiProperty()
    quantity: number;

    @ApiProperty({
        isArray: true,
    })
    colors: string[];

    @ApiProperty()
    country: string;

    @ApiProperty()
    manufactoringDate: Date;

    @ApiProperty()
    description: string;

    @ApiProperty()
    featureImage: string;

    @ApiProperty({
        isArray: true,
    })
    additionalImages: string[];
}
