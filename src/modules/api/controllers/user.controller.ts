import { Role } from '@/database/entities';
import { UserRepository } from '@/database/repositories';
import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MoreThanOrEqual } from 'typeorm';
import { Roles } from '../decorators/roles.decorator';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { IdsDto } from '../dtos/ids.dto';
import { QueryUserDto } from '../dtos/query-user.dto';
import { JwtAuthGuard } from '../guards';
import { RolesGuard } from '../guards/role.guard';
import { UserService } from '../services/user.service';

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly userRepository: UserRepository,
    ) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3)
    @Get()
    async get(@Query() query: QueryUserDto, @Req() req) {
        const [users, count] = await this.userRepository.findAndCount({
            where: {
                role:
                    query.role && query.role >= req.user.role
                        ? query.role
                        : MoreThanOrEqual(req.user.role),
            },
        });
        return {
            data: users,
            count,
        };
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.create(userDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3)
    @Post('update')
    update(@Body() userDto: UpdateUserDto) {
        return this.userService.update(userDto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post('remove')
    public remove(@Body() dto: IdsDto) {
        return this.userService.softDelete(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2, Role.TIER_3, Role.TIER_4)
    @Post('restore')
    public restore(@Body() dto: IdsDto) {
        return this.userService.restore(dto);
    }
}
