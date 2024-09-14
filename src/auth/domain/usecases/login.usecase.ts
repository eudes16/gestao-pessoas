import { Usecase } from "src/commons/usecase.interface";
import { LoginInput } from "../input/login-input";
import { LoginOutput } from "../output/login-output";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserFindByEmailUsecase } from "./../../../user/domain/usecases/user-find-by-email.usecase";
import { CrudRepository } from "src/commons/crud-repository.interface";
import { Encryt } from "src/commons/encryt";

export class LoginUsecase implements Usecase<LoginInput, LoginOutput> {
    constructor(
        private repository: CrudRepository<any>,
        private jwtService: JwtService,
        private encrypt: Encryt
    ) {}

    async execute(dto: LoginInput): Promise<LoginOutput> {
        const useUsecase = new UserFindByEmailUsecase(this.repository);
        const user = await useUsecase.execute({ email: dto.email });

        if (!user) {
            throw new NotFoundException("User not found");
        }

        if (user.password !== this.encrypt.passwordEncode(dto.password)) {
            throw new UnauthorizedException("Invalid password");
        }

        const payload = { sub: user.id, email: user.email, name: user.name }; 

        const token = await this.jwtService.signAsync(payload);
        return {
            token
        }
    }
}