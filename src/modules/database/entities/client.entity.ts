import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Client extends BaseEntity {
    @Column()
    logo: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    numOfItemCredits: number;

    @Column()
    kycVerified: boolean;

    @Column()
    email: string;

    @Column()
    phoneNumber: string;

    @Column({
        nullable: true,
    })
    otherInfo: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    addressLine1: string;

    @Column()
    addressLine2: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    state: string;

    @Column()
    postalCode: string;
}
