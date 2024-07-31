import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import {
    AuthController,
    ClientController,
    ProductController,
    UserController,
} from '@/api/controllers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    AuthService,
    UserWalletService,
    UserService,
    ProductService,
    ClientService,
} from '@/api/services';
// import { BullModule } from '@nestjs/bull';
// import { ScheduleModule } from '@nestjs/schedule';
import { configQueue } from '@/database/configs';
import { BlockchainModule } from '@/blockchain';
import { JwtModule } from '@nestjs/jwt';
import { appConfig, SecurityConfig } from 'app.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { S3Module } from 'modules/s3';

const controllers = [
    AuthController,
    UserController,
    ProductController,
    ClientController,
];

const services = [
    AuthService,
    UserWalletService,
    UserService,
    ProductService,
    ClientService,
];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: [configQueue, appConfig],
        }),
        // ScheduleModule.forRoot(),
        // BullModule.forRootAsync({
        //     useFactory: (config: ConfigService) => config.get('queue'),
        //     inject: [ConfigService],
        // }),
        // BullModule.registerQueue({
        //     name: 'QUEUE',
        // }),
        BlockchainModule,
        DatabaseModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => {
                const securityConfig =
                    configService.get<SecurityConfig>('security');
                return {
                    secret: securityConfig.jwtAccessSecret,
                    signOptions: {
                        expiresIn: securityConfig.expiresIn,
                    },
                };
            },
            inject: [ConfigService],
        }),
        S3Module,
    ],
    controllers: [...controllers],
    providers: [...services, JwtStrategy],
})
export class ApiModule {}
