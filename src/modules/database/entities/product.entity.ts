import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum ProductState {
    DRAFT,
    RELEASED,
}

@Entity()
export class Product extends BaseEntity {
    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    brand: string;

    @ApiProperty()
    @Column({ nullable: true })
    type: string;

    @ApiProperty()
    @Column({ nullable: true })
    quantity: number;

    @ApiProperty()
    @Column('text', { array: true, nullable: true })
    colors: string[];

    @ApiProperty()
    @Column({ nullable: true })
    country: string;

    @ApiProperty()
    @Column({ nullable: true })
    manufactoringDate: Date;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @Column()
    featureImage: string;

    @ApiProperty()
    @Column('text', { array: true, nullable: true })
    additionalImages: string[];

    @ApiProperty({ enum: ProductState })
    @Column({
        type: 'enum',
        enum: ProductState,
        default: ProductState.DRAFT,
    })
    state: ProductState;
}
