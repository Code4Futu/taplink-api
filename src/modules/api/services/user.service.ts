import { User, UserWallet } from '@/database/entities';
import { UserRepository, UserWalletRepository } from '@/database/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserWalletService } from './user-wallet.service';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userWalletRepository: UserWalletRepository,
        private readonly dataSource: DataSource,
        private readonly userWalletService: UserWalletService,
    ) {}

    async create({ address, username }: CreateUserDto) {
        const isExists = await Promise.all([
            this.userRepository.exists({
                where: {
                    username,
                },
            }),
            this.userWalletRepository.exists({
                where: {
                    address,
                },
            }),
        ]);
        if (isExists.some((i) => i)) {
            throw new HttpException(
                'User or wallet exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = new User();
        user.username = username;
        const wallet = new UserWallet();
        wallet.address = address;
        wallet.user = user;
        wallet.nonce = this.userWalletService.generateRandomNonce();
        await this.dataSource.transaction(async () => {
            await this.userRepository.save(user);
            await this.userWalletRepository.save(wallet);
        });
        return user;
    }

    async update({ id, address, username }: UpdateUserDto) {
        const isExists = await this.userWalletRepository.exists({
            where: {
                address,
            },
        });
        if (isExists) {
            throw new HttpException(
                'User or wallet exists',
                HttpStatus.BAD_REQUEST,
            );
        }
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        user.username = username;
        const wallet = new UserWallet();
        wallet.address = address;
        wallet.user = user;
        wallet.nonce = this.userWalletService.generateRandomNonce();
        await this.dataSource.transaction(async () => {
            await this.userRepository.save(user);
            await this.userWalletRepository.save(wallet);
        });
        return user;
    }
}
