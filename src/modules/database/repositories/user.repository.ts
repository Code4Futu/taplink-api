import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '@/database/entities';

export class UserRepository extends Repository<User> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }
}
