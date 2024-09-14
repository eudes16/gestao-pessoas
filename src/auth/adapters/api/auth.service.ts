import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginInput } from 'src/auth/domain/input/login-input';
import { LoginOutput } from 'src/auth/domain/output/login-output';
import { LoginUsecase } from 'src/auth/domain/usecases/login.usecase';
import { Encryt } from 'src/commons/encryt';
import { UserDbRepository } from 'src/user/adapters/db/user-db.repository';

@Injectable()
export class AuthService {
    constructor(
        private repostory: UserDbRepository, 
        private jwtService: JwtService,
        private encrypt: Encryt
    ) {}

    async login(dto: LoginInput): Promise<LoginOutput>{
        const usecase = new LoginUsecase(this.repostory, this.jwtService, this.encrypt);
        return await usecase.execute(dto);
    }
}
