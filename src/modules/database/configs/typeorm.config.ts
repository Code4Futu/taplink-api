import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { Client, Product, User, UserWallet } from '../entities';
import { Init1722351360037 } from '../migrations/1722351360037-init';
import { AddTier1Admin1722351448334 } from '../migrations/1722351448334-add_tier1_admin';

config();
const configService = new ConfigService();
export const entities = [User, UserWallet, Product, Client];
const migrations = [Init1722351360037, AddTier1Admin1722351448334];

export const dbConfig = {
    host: configService.get('DB_HOST'),
    port: parseInt(configService.get('DB_PORT') ?? '5432', 10),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
};

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [...entities],
    migrations: [...migrations],
    logging: false,
    ssl: false,
    // TODO add db ssl in prod
    // ssl:
    //     process.env.APP_ENV == 'production'
    //         ? {
    //               ca:
    //                   process.env.APP_ENV == 'production'
    //                       ? serverCaProd
    //                       : serverCaStag,
    //               key:
    //                   process.env.APP_ENV == 'production'
    //                       ? clientKeyProd
    //                       : clientKeyStag,
    //               cert:
    //                   process.env.APP_ENV == 'production'
    //                       ? clientCertProd
    //                       : clientCertStag,
    //               rejectUnauthorized: false,
    //           }
    //         : false,
};

export default new DataSource(dataSourceOptions);
