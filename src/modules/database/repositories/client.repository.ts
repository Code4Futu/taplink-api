import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Client } from '@/database/entities';

export class ClientRepository extends Repository<Client> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Client, dataSource.createEntityManager());
    }
}
