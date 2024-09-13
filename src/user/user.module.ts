import { Module } from '@nestjs/common';
import { UserService } from './adapters/api/user.service';
import { InMemoryUserRepository } from './adapters/db/in-memory-user.repository';
import { UserController } from './adapters/api/user.controller';

@Module({
  providers: [
    UserService,
    InMemoryUserRepository,
  ],
  controllers: [
    UserController,
  ],
})
export class UserModule { }
