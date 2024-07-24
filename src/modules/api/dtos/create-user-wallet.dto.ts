import { Transform } from 'class-transformer';

export class CreateUserWalletDto {
    @Transform(({ value }) => value.toLowerCase())
    address: string;

    nonce: number;
}
