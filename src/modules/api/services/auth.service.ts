import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { EntityNotFoundError } from 'typeorm';
import { UserWalletService } from './user-wallet.service';
import { GetNonceDto, JwtPayloadDto, LoginWalletDto } from '../dtos';
import { UserWallet } from '@/database/entities';
import { SecurityConfig } from 'app.config';
import { SIGN_MESSAGE } from '@/shared/constants';
import { EvmService } from '@/blockchain/services';

@Injectable()
export class AuthService {
    constructor(
        private readonly userWalletService: UserWalletService,
        private readonly evmService: EvmService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async getNonceData(query: GetNonceDto) {
        const userWallet = await this.userWalletService.findOrCreateUserWallet({
            address: query.address,
        });
        return {
            address: userWallet.address,
            nonce: userWallet.nonce,
        };
    }

    async login(loginWalletDto: LoginWalletDto) {
        const { address, signature } = loginWalletDto;

        const userWallet = await this.userWalletService.findByAddress(address);

        if (!userWallet) {
            throw new EntityNotFoundError(UserWallet, 'Not Found Wallet.');
        } else {
            const hashMsg = `${SIGN_MESSAGE.login}${userWallet.nonce}`;
            this.evmService.validateSignature(
                userWallet.address,
                signature,
                hashMsg,
            );

            await this.userWalletService.regenerateNonce(userWallet);

            const payload: JwtPayloadDto = {
                id: userWallet.id,
                address: userWallet.address,
                nonce: userWallet.nonce,
            };

            return this.generateTokens(payload);
        }
    }

    generateTokens(payload: JwtPayloadDto) {
        return {
            accessToken: this.generateAccessToken(payload),
            refreshToken: this.generateRefreshToken(payload),
        };
    }

    private generateAccessToken(payload: JwtPayloadDto): string {
        return this.jwtService.sign(payload);
    }

    private generateRefreshToken(payload: JwtPayloadDto): string {
        const securityConfig =
            this.configService.get<SecurityConfig>('security');
        return this.jwtService.sign(payload, {
            secret: securityConfig.jwtRefreshSecret,
            expiresIn: securityConfig.refreshIn,
        });
    }

    validateUser(userId: string): Promise<UserWallet> {
        return this.userWalletService.findByUsedId(userId);
    }
}
