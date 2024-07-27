import { Module } from '@nestjs/common';
import { DatabaseModule } from '@/database';
import {
    AuthController,
    ProductController,
    UserController,
} from '@/api/controllers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
    AuthService,
    UserWalletService,
    UserService,
    ProductService,
} from '@/api/services';
// import { BullModule } from '@nestjs/bull';
// import { ScheduleModule } from '@nestjs/schedule';
import { configQueue } from '@/database/configs';
import { BlockchainModule } from '@/blockchain';
import { JwtModule } from '@nestjs/jwt';
import { appConfig, SecurityConfig } from 'app.config';
import { JwtStrategy } from './strategies/jwt.strategy';

const controllers = [AuthController, UserController, ProductController];

const services = [AuthService, UserWalletService, UserService, ProductService];

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
    ],
    controllers: [...controllers],
    providers: [...services, JwtStrategy],
})
export class ApiModule {}
