import { Product } from '@/database/entities';
import { ProductRepository } from '@/database/repositories';
import { BadRequestException, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { CreateProductDto, RemoveProductDto, UpdateProductDto } from '../dtos';

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    create({
        title,
        brand,
        type,
        quantity,
        colors,
        country,
        manufactoringDate,
        description,
        featureImage,
        additionalImages,
    }: CreateProductDto) {
        const product = new Product();
        product.title = title;
        product.brand = brand;
        product.type = type;
        product.quantity = quantity;
        product.colors = colors;
        product.country = country;
        product.manufactoringDate = manufactoringDate;
        product.description = description;
        product.featureImage = featureImage;
        product.additionalImages = additionalImages;

        return this.productRepository.save(product);
    }

    async update({
        id,
        title,
        brand,
        type,
        quantity,
        colors,
        country,
        manufactoringDate,
        description,
        featureImage,
        additionalImages,
    }: UpdateProductDto) {
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
        product.featureImage = featureImage;
        product.additionalImages = additionalImages;

        return this.productRepository.save(product);
    }

    softDelete({ ids }: RemoveProductDto) {
        return this.productRepository.softDelete({ id: In(ids) });
    }

    restore({ ids }: RemoveProductDto) {
        return this.productRepository.restore({ id: In(ids) });
    }
}
