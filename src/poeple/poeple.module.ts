import { Module } from '@nestjs/common';
import { InMemoryPoepleRepository } from './adapters/db/in-memory-poeple.repository';
import { PoepleController } from './adapters/api/poeple.controller';
import { PoepleService } from './adapters/api/poeple.service';
import { PoepleDbRepository } from './adapters/db/poeple-db.repository';
import prismaClient from 'src/commons/prisma-client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    providers: [
        ConfigService,
        JwtService,
        PoepleService,
        {
            provide: 'PoepleRepository',
            useClass: InMemoryPoepleRepository,
        },
        {
            provide: 'PoepleRepository',
            useClass: PoepleDbRepository,
        },
        {
            provide: 'CONNECTION',
            useValue: prismaClient,
        }

    ],
    controllers: [
        PoepleController
    ],
})
export class PoepleModule { }
