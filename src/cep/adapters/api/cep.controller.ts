import { Controller, Get, Param, Query, Req, Request, UseGuards } from '@nestjs/common';
import { CepService } from './cep.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CepInputDto } from './port/cep-input.dto';

@Controller('cep')
export class CepController {

    constructor(
        private cepService: CepService
    ) {}

    @UseGuards(AuthGuard)
    @Get(':cep')
    async findCep(@Param() dto: CepInputDto, @Req() req: Request) {
        return await this.cepService.findCep(dto.cep);
    }
}
