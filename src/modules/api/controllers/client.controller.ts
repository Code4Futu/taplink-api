import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ClientService } from '../services';
import { JwtAuthGuard } from '../guards';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '@/database/entities';
import { ClientIdsDto } from '../dtos/client-ids.dto';
import { CreateClientDto, UpdateClientDto } from '../dtos';

@ApiTags('Client')
@Controller('/client')
export class ClientController {
    constructor(private readonly clientService: ClientService) {}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2)
    @Post()
    public create(@Body() client: CreateClientDto) {
        return this.clientService.create(client);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2)
    @Post('update')
    public update(@Body() client: UpdateClientDto) {
        return this.clientService.update(client);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2)
    @Post('remove')
    public remove(@Body() dto: ClientIdsDto) {
        return this.clientService.softDelete(dto);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.TIER_1, Role.TIER_2)
    @Post('restore')
    public restore(@Body() dto: ClientIdsDto) {
        return this.clientService.restore(dto);
    }
}
