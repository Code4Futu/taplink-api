import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @ApiProperty()
    @IsNotEmpty()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
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
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    featureImage: string;

    @ApiProperty({
        isArray: true,
    })
    additionalImages: string[];
}
