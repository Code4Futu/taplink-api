import { User, UserWallet } from '@/database/entities';
import { UserRepository } from '@/database/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityNotFoundError, In } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { UserWalletService } from './user-wallet.service';
import { IdsDto } from '../dtos/ids.dto';

@Injectable()
export class UserService {
    constructor(
        // @Inject(REQUEST) private request,
        private readonly userRepository: UserRepository,
        private readonly userWalletService: UserWalletService,
    ) {}

    async create({ address, username, role }: CreateUserDto) {
        const exist = await this.userWalletService.findByAddress(address);
        if (exist) {
            throw new BadRequestException('Wallet exists');
        }
        const wallet = new UserWallet();
        wallet.address = address;
        wallet.nonce = this.userWalletService.generateRandomNonce();
        const user = new User();
        user.username = username;
        user.role = role;
        user.wallet = wallet;
        return this.userRepository.save(user);
    }

    async update({ id, role, username }: UpdateUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        if (!user) {
            throw new BadRequestException('User not found');
        }
        user.username = username;
        user.role = role;
        return this.userRepository.save(user);
    }

    async findByUsedId(userId: string) {
        return this.userRepository.findOne({
            where: {
                id: userId,
            },
        });
    }

    async findByWallet(wallet: string) {
        const user = await this.userRepository.findOne({
            relations: {
                wallet: true,
            },
            where: {
                wallet: {
                    address: wallet,
                },
            },
        });
        if (!user) {
            throw new EntityNotFoundError(User, 'User not found');
        }
        return user;
    }

    softDelete({ ids }: IdsDto) {
        return this.userRepository.softDelete({ id: In(ids) });
    }

    restore({ ids }: IdsDto) {
        return this.userRepository.restore({ id: In(ids) });
    }
}
