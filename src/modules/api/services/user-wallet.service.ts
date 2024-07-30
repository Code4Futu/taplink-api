import { UserWallet } from '@/database/entities';
import { UserWalletRepository } from '@/database/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserWalletService {
    constructor(private readonly userWalletRepository: UserWalletRepository) {}

    regenerateNonce(userWallet: UserWallet) {
        return this.userWalletRepository.update(userWallet.id, {
            nonce: this.generateRandomNonce(),
        });
    }

    generateRandomNonce(): number {
        return Math.floor(Math.random() * 1000000);
    }

    findByAddress(address: string) {
        return this.userWalletRepository.findOne({
            where: {
                address,
            },
        });
    }
}
