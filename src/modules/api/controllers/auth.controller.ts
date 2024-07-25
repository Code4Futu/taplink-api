import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetNonceDto, LoginWalletDto } from '../dtos';
import { AuthService } from '../services';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get('nonce')
    nonce(@Query() query: GetNonceDto) {
        return this.authService.getNonceData(query);
    }

    @Post('login')
    login(@Body() loginUserDto: LoginWalletDto) {
        return this.authService.login(loginUserDto);
    }
}
