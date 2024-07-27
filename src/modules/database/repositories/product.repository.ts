import { DataSource, Repository } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { Product } from '@/database/entities';

export class ProductRepository extends Repository<Product> {
    constructor(@InjectDataSource() private dataSource: DataSource) {
        super(Product, dataSource.createEntityManager());
    }
}
