import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();
const configService = new ConfigService();

export interface Config {
    security: SecurityConfig;
}

export interface S3Config {
    accessKeyId: string;
    secretAccessKey: string;
    region: string;
    bucket: string;
    base1IdImagePath: string;
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

export const s3Config: S3Config = {
    accessKeyId: configService.get('S3_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('S3_SECRET_ACCESS_KEY'),
    region: configService.get('S3_REGION'),
    bucket: configService.get('S3_BUCKET'),
    base1IdImagePath: configService.get('S3_BASE_1ID_IMAGE_PATH'),
};
