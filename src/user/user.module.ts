import { Module } from '@nestjs/common';
import { UserService } from './adapters/api/user.service';
import { InMemoryUserRepository } from './adapters/db/in-memory-user.repository';
import { UserController } from './adapters/api/user.controller';
import { UserDbRepository } from './adapters/db/user-db.repository';
import prismaClient from 'src/commons/prisma-client';

@Module({
  providers: [
    UserService,
    InMemoryUserRepository,
    UserDbRepository,
    {
      provide: 'CONNECTION',
      useValue: prismaClient,
    }
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule { }
