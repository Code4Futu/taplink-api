import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateClientDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsNotEmpty()
    logo: string;

    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    numOfItemCredits: number;

    @ApiProperty()
    @IsNotEmpty()
    kycVerified: boolean;

    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    otherInfo: string;

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    addressLine1: string;

    @ApiProperty()
    @IsNotEmpty()
    addressLine2: string;

    @ApiProperty()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    postalCode: string;
}
