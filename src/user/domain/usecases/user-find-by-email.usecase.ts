import { Usecase } from "src/commons/usecase.interface";
import { UserFindByEmailInput } from "../input/user-find-by-email-input.interface";
import { UserFindByEmailOutput } from "../output/user-find-by-email-output.interface";
import { CrudRepository } from "src/commons/crud-repository.interface";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../input/user-repository.interface";

@Injectable()
export class UserFindByEmailUsecase implements Usecase<UserFindByEmailInput, UserFindByEmailOutput> {
    constructor(
        private repository: UserRepository
    ) {}

    async execute(dto: UserFindByEmailInput): Promise<UserFindByEmailOutput> {
        const result = await this.repository.findUserByEmail(dto.email);
        return result;
    }
}