import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export interface Config {
    security: SecurityConfig;
}

export interface SecurityConfig {
    jwtAccessSecret: string;
    jwtRefreshSecret: string;
    expiresIn: string;
    refreshIn: string;
    bcryptSaltOrRound: string | number;
}

export const appConfig = (): Config => ({
    security: {
        jwtAccessSecret: configService.get('JWT_ACCESS_SECRET'),
        jwtRefreshSecret: configService.get('JWT_REFRESH_SECRET'),
        expiresIn: '30m',
        refreshIn: '7d',
        bcryptSaltOrRound: 10,
    },
});
