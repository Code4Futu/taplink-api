import { EvmService } from '@/blockchain/services';
import { User } from '@/database/entities';
import { SIGN_MESSAGE } from '@/shared/constants';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SecurityConfig } from 'app.config';
import { GetNonceDto, JwtPayloadDto, LoginWalletDto } from '../dtos';
import { UserWalletService } from './user-wallet.service';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userWalletService: UserWalletService,
        private readonly userService: UserService,
        private readonly evmService: EvmService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    async getNonceData(query: GetNonceDto) {
        const user = await this.userService.findByWallet(query.address);
        return {
            address: user.wallet.address,
            nonce: user.wallet.nonce,
        };
    }

    async login(loginWalletDto: LoginWalletDto) {
        const { address, signature } = loginWalletDto;
        const user = await this.userService.findByWallet(address);
        const hashMsg = `${SIGN_MESSAGE.login}${user.wallet.nonce}`;
        this.evmService.validateSignature(
            user.wallet.address,
            signature,
            hashMsg,
        );
        await this.userWalletService.regenerateNonce(user.wallet);
        const payload: JwtPayloadDto = {
            id: user.id,
            username: user.username,
            address: user.wallet.address,
            role: user.role,
        };
        return this.generateTokens(payload);
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

    validateUser(userId: string): Promise<User> {
        return this.userService.findByUsedId(userId);
    }
}
