import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from 'src/auth/domain/input/login-input';
import { LoginOutput } from 'src/auth/domain/output/login-output';
import { LoginUsecase } from 'src/auth/domain/usecases/login.usecase';
import { Encryt } from 'src/commons/encryt';
import { UserDbRepository } from 'src/user/adapters/db/user-db.repository';
import { UserRepository } from 'src/user/domain/input/user-repository.interface';

@Injectable()
export class AuthService {
    constructor(
        @Inject('UserRepository')
        private repostory: UserRepository, 
        private jwtService: JwtService,
        private encrypt: Encryt
    ) {}

    async login(dto: LoginInput): Promise<LoginOutput>{
        const usecase = new LoginUsecase(this.repostory, this.jwtService, this.encrypt);
        return await usecase.execute(dto);
    }
}
