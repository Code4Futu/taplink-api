import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos';
import { JwtAuthGuard } from '../guards';

@ApiTags('User')
@Controller('/user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    public async create(@Body() userDto: CreateUserDto) {
        return await this.userService.create(userDto);
    }
}
