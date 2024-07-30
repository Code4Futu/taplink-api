import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RemoveProductDto, UpdateProductDto } from '../dtos';
import { CreateProductDto } from '../dtos/create-product.dto';
import { JwtAuthGuard } from '../guards';
import { ProductService } from '../services';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@/database/entities';

@ApiTags('Product')
@Controller('/product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post()
    public create(@Body() product: CreateProductDto) {
        return this.productService.create(product);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post('update')
    public update(@Body() product: UpdateProductDto) {
        return this.productService.update(product);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post('remove')
    public remove(@Body() product: RemoveProductDto) {
        return this.productService.softDelete(product);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post('restore')
    public restore(@Body() product: RemoveProductDto) {
        return this.productService.restore(product);
    }
}
