import { Product } from '@/database/entities';
import { ProductRepository } from '@/database/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CreateProductDto, RemoveProductDto, UpdateProductDto } from '../dtos';
import { S3Service } from 'modules/s3';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepository: ProductRepository,
        private readonly s3Service: S3Service,
    ) {}

    async create(
        {
            title,
            brand,
            type,
            quantity,
            colors,
            country,
            manufactoringDate,
            description,
        }: CreateProductDto,
        featureImage: Express.Multer.File[],
        additionalImages?: Express.Multer.File[],
    ) {
        const feature = await this.s3Service.uploadFile(featureImage[0]);
        const additional = await Promise.all(
            additionalImages.map((i) => this.s3Service.uploadFile(i)),
        );
        const product = new Product();
        product.title = title;
        product.brand = brand;
        product.type = type;
        product.quantity = quantity;
        product.colors = colors;
        product.country = country;
        product.manufactoringDate = manufactoringDate;
        product.description = description;
        product.featureImage = feature;
        product.additionalImages = additional;

        return this.productRepository.save(product);
    }

    async update(
        {
            id,
            title,
            brand,
            type,
            quantity,
            colors,
            country,
            manufactoringDate,
            description,
        }: UpdateProductDto,
        // featureImage: string,
        // additionalImages: string[],
    ) {
        const product = await this.productRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new BadRequestException('Product not found');
        }
        product.title = title;
        product.brand = brand;
        product.type = type;
        product.quantity = quantity;
        product.colors = colors;
        product.country = country;
        product.manufactoringDate = manufactoringDate;
        product.description = description;
        // product.featureImage = featureImage;
        // product.additionalImages = additionalImages;

        return this.productRepository.save(product);
    }

    softDelete({ ids }: RemoveProductDto) {
        return this.productRepository.softDelete({ id: In(ids) });
    }

    restore({ ids }: RemoveProductDto) {
        return this.productRepository.restore({ id: In(ids) });
    }
}
