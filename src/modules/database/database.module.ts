import { Module } from '@nestjs/common';
import { configDb } from './configs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    ClientRepository,
    ProductRepository,
    UserRepository,
    UserWalletRepository,
} from './repositories';

import { entities } from './configs/typeorm.config';

const repositories = [
    UserRepository,
    UserWalletRepository,
    ProductRepository,
    ClientRepository,
];

const services = [];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            expandVariables: true,
            load: [configDb],
        }),
        TypeOrmModule.forRootAsync({
            useFactory: (config: ConfigService) => config.get('database'),
            inject: [ConfigService],
        }),
        TypeOrmModule.forFeature(entities),
    ],
    providers: [...repositories, ...services],
    exports: [...repositories, ...services],
})
export class DatabaseModule {}
