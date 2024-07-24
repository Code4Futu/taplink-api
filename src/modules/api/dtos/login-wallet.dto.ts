import { Transform } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class LoginWalletDto {
    @IsNotEmpty()
    @Transform(({ value }) => value.toLowerCase())
    readonly address: string;

    @IsNotEmpty()
    readonly signature: string;
}
