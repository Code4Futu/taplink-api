import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services';
import { GetNonceDto, LoginWalletDto } from '../dtos';
import { JwtAuthGuard } from '../guards/auth.guard';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('nonce')
    nonce(@Query() query: GetNonceDto) {
        return this.authService.getNonceData(query);
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginWalletDto) {
        return await this.authService.login(loginUserDto);
    }

    @Get('test')
    @UseGuards(JwtAuthGuard)
    test() {
        return 'Hello World';
    }
}
