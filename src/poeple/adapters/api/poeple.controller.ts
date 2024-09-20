import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { PoepleService } from "./poeple.service";
import { PoepleCreateInput } from "src/poeple/domain/input/poeple-create-input.interface";
import { PoepleCreateOutput } from "src/poeple/domain/output/poeplle-create-output.interface";
import { PoepleFindResponse } from "./ports/poeple-find.dto";
import { PoepleFindDto } from "./ports/poeple-find.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { PoepleUpdateInput } from "src/poeple/domain/input/poeple-update-input.interface";
import { PoepleUpdateOutput } from "src/poeple/domain/output/poeple-update-output.interface";
import { PoepleDeleteOutput } from "src/poeple/domain/output/poeple-delete-output.interface";
import { PoepleDeleteInput } from "src/poeple/domain/input/poeple-delete-input.interface";

@Controller('poeple')
export class PoepleController {
    constructor(
        private poepleService: PoepleService,
    ) { }

    
    @UseGuards(AuthGuard)
    @Get()
    async findPoeple(@Query() dto: PoepleFindDto): Promise<PoepleFindResponse> {
        return await this.poepleService.find(dto);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createPoeple(@Body() dto: PoepleCreateInput): Promise<PoepleCreateOutput> {
        return await this.poepleService.create(dto);
    }
    
    @UseGuards(AuthGuard)
    @Put(":id")
    async updatePoeple(@Param() params: any, @Body() dto: PoepleUpdateInput): Promise<PoepleUpdateOutput> {
        dto.id = +params.id;
        return await this.poepleService.update(dto);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deletePoeple(@Param() params: any): Promise<PoepleDeleteOutput> {
        const dto: PoepleDeleteInput = { id: +params.id };
        return await this.poepleService.delete(dto);
    }
}