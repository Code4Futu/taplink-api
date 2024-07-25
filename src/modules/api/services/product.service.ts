import { ProductRepository } from '@/database/repositories';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, RemoveProductDto, UpdateProductDto } from '../dtos';
import { Product } from '@/database/entities';
import { In } from 'typeorm';

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
            throw new HttpException(
                'Product not found',
                HttpStatus.BAD_REQUEST,
            );
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

    remove({ ids }: RemoveProductDto) {
        return this.productRepository.delete({ id: In(ids) });
    }
}
