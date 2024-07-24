import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { UserWallet } from '@/database/entities';

export class UserWalletRepository extends Repository<UserWallet> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(UserWallet, dataSource.createEntityManager());
    }
}
