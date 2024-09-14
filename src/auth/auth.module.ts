import { Module } from '@nestjs/common';
import { AuthService } from './adapters/api/auth.service';
import prismaClient from 'src/commons/prisma-client';
import { UserDbRepository } from 'src/user/adapters/db/user-db.repository';
import { AuthController } from './adapters/api/auth.controller';
import { ConfigService } from '@nestjs/config';
import { Encryt } from 'src/commons/encryt';

@Module({
    providers: [
        ConfigService,
        Encryt,
        UserDbRepository,
        {
            provide: 'CONNECTION',
            useValue: prismaClient,
        },
        AuthService,
    ],
    controllers: [AuthController],
})
export class AuthModule { }
