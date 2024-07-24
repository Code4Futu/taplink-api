import { UserWallet } from '@/database/entities';
import { Injectable } from '@nestjs/common';
import { CreateUserWalletDto } from '../dtos';
import { UserWalletRepository } from '@/database/repositories';

@Injectable()
export class UserWalletService {
    constructor(private readonly userWalletRepository: UserWalletRepository) {}

    async findOrCreateUserWallet({ address }): Promise<UserWallet> {
        const userWallet = await this.userWalletRepository.findOne({
            where: { address },
        });
        if (userWallet) {
            return userWallet;
        } else {
            const createUserWalletDto: CreateUserWalletDto = {
                address,
                nonce: this.generateRandomNonce(),
            };
            return this.userWalletRepository.save(createUserWalletDto);
        }
    }

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

    findByUsedId(userId: string) {
        return this.userWalletRepository.findOne({
            where: {
                user: {
                    id: userId,
                },
            },
        });
    }
}
