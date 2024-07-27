import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RemoveProductDto, UpdateProductDto } from '../dtos';
import { CreateProductDto } from '../dtos/create-product.dto';
import { JwtAuthGuard } from '../guards';
import { ProductService } from '../services';

@ApiTags('Product')
@Controller('/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    public create(@Body() product: CreateProductDto) {
        return this.productService.create(product);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('update')
    public update(@Body() product: UpdateProductDto) {
        return this.productService.update(product);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('remove')
    public remove(@Body() product: RemoveProductDto) {
        return this.productService.remove(product);
    }
}
