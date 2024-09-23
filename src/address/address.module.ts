import { Module } from '@nestjs/common';
import prismaClient from 'src/commons/prisma-client';
import { AddressDbRepository } from './adapters/db/address-db.repository';
import { AddressService } from './adapters/api/address.service';
import { AddressController } from './adapters/api/address.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [
        ConfigService,
        JwtService,
        {
            provide: 'AddressRepository',
            useClass: AddressDbRepository,
        },
        {
            provide: 'CONNECTION',
            useValue: prismaClient,
        },
        AddressService
    ],
    controllers: [AddressController],
})
export class AddressModule {}
