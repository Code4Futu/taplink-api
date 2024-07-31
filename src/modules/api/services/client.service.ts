import { ClientRepository } from '@/database/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from '../dtos';
import { Client } from '@/database/entities';
import { ClientIdsDto } from '../dtos/client-ids.dto';
import { In } from 'typeorm';
import { S3Service } from 'modules/s3';

@Injectable()
export class ClientService {
    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly s3Service: S3Service,
    ) {}

    async create(clientDto: CreateClientDto, file: Express.Multer.File) {
        const logo = await this.s3Service.uploadFile(file);
        const client = new Client();
        client.logo = logo;
        client.name = clientDto.name;
        client.address = clientDto.address;
        client.numOfItemCredits = clientDto.numOfItemCredits;
        client.kycVerified = clientDto.kycVerified;
        client.email = clientDto.email;
        client.phoneNumber = clientDto.phoneNumber;
        client.otherInfo = clientDto.otherInfo;
        client.firstName = clientDto.firstName;
        client.lastName = clientDto.lastName;
        client.addressLine1 = clientDto.addressLine1;
        client.addressLine2 = clientDto.addressLine2;
        client.city = clientDto.city;
        client.country = clientDto.country;
        client.state = clientDto.state;
        client.postalCode = clientDto.postalCode;
        return this.clientRepository.save(client);
    }

    async update(clientDto: UpdateClientDto, file?: Express.Multer.File) {
        const client = await this.clientRepository.findOne({
            where: {
                id: clientDto.id,
            },
        });
        if (!client) {
            throw new BadRequestException('Client not found');
        }
        if (file) {
            const oldLogo = client.logo;
            client.logo = await this.s3Service.uploadFile(file);
            await this.s3Service.removeFile(oldLogo);
        }
        client.name = clientDto.name;
        client.address = clientDto.address;
        client.numOfItemCredits = clientDto.numOfItemCredits;
        client.kycVerified = clientDto.kycVerified;
        client.email = clientDto.email;
        client.phoneNumber = clientDto.phoneNumber;
        client.otherInfo = clientDto.otherInfo;
        client.firstName = clientDto.firstName;
        client.lastName = clientDto.lastName;
        client.addressLine1 = clientDto.addressLine1;
        client.addressLine2 = clientDto.addressLine2;
        client.city = clientDto.city;
        client.country = clientDto.country;
        client.state = clientDto.state;
        client.postalCode = clientDto.postalCode;
        return this.clientRepository.save(client);
    }

    softDelete({ ids }: ClientIdsDto) {
        return this.clientRepository.softDelete({ id: In(ids) });
    }

    restore({ ids }: ClientIdsDto) {
        return this.clientRepository.restore({ id: In(ids) });
    }
}
