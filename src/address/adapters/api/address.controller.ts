import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddressFindDto, AddressFindResponse } from './port/address-find.dto';
import { AddressCreateInput } from 'src/address/domain/input/address-create-input.interface';
import { AddressDeleteOutput } from 'src/address/domain/output/address-delete-output.interface';
import { AddressDeleteInput } from 'src/address/domain/input/address-delete-input.interface';

@Controller('address')
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) {}

    @UseGuards(AuthGuard)
    @Get()
    async findAddress(@Query() dto: AddressFindDto): Promise<AddressFindResponse> {
        return await this.addressService.find(dto);
    }

    @UseGuards(AuthGuard)
    @Post()
    async createAddress(@Body() dto: AddressCreateInput): Promise<AddressFindResponse> {
        return await this.addressService.create(dto);
    }

    @UseGuards(AuthGuard)
    @Put(":id")
    async updateAddress(@Param("id") id: number,  @Body() dto: AddressCreateInput): Promise<AddressFindResponse> {
        return await this.addressService.update(id, dto);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async deleteAddress(@Param() params: AddressDeleteInput): Promise<AddressDeleteOutput> {
        return await this.addressService.delete(+params.id);
    }
}
