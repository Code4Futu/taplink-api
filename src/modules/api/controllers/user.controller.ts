import { Role } from '@/database/entities';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { CreateUserDto, UpdateUserDto } from '../dtos';
import { JwtAuthGuard } from '../guards';
import { RolesGuard } from '../guards/role.guard';
import { UserService } from '../services/user.service';
import { IdsDto } from '../dtos/ids.dto';

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

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
