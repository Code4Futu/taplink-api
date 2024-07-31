import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RemoveProductDto, UpdateProductDto } from '../dtos';
import { CreateProductDto } from '../dtos/create-product.dto';
import { JwtAuthGuard } from '../guards';
import { ProductService } from '../services';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@/database/entities';
import { QueryProductDto } from '../dtos/query-product.dto';
import { ProductRepository } from '@/database/repositories';
import { Like } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('Product')
@Controller('/product')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly productRepository: ProductRepository,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Get()
    async get(@Query() query: QueryProductDto) {
        const [products, count] = await this.productRepository.findAndCount({
            where: {
                title: query.title ? Like(query.title) : undefined,
            },
        });
        return {
            data: products,
            count,
        };
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post()
    @UseInterceptors(
        FileFieldsInterceptor([
            { name: 'feature', maxCount: 1 },
            { name: 'additional', maxCount: 7 },
        ]),
    )
    public create(
        @Body() product: CreateProductDto,
        @UploadedFiles()
        files: {
            feature?: Express.Multer.File[];
            additional?: Express.Multer.File[];
        },
    ) {
        return this.productService.create(
            product,
            files.feature,
            files.additional,
        );
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post('update')
    // @UseInterceptors(
    //     FileFieldsInterceptor([
    //         { name: 'feature', maxCount: 1 },
    //         { name: 'additional', maxCount: 7 },
    //     ]),
    // )
    public update(
        @Body() product: UpdateProductDto,
        // @UploadedFiles()
        // files: {
        //     feature?: Express.Multer.File[];
        //     additional?: Express.Multer.File[];
        // },
    ) {
        return this.productService.update(
            product,
            // files.feature.filename,
            // files.additional.map((f) => f.filename),
        );
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
