import { Usecase } from "src/commons/usecase.interface";
import { UserFindByEmailInput } from "../input/user-find-by-email-input.interface";
import { UserFindByEmailOutput } from "../output/user-find-by-email-output.interface";
import { CrudRepository } from "src/commons/crud-repository.interface";

export class UserFindByEmailUsecase implements Usecase<UserFindByEmailInput, UserFindByEmailOutput> {
    constructor(
        private repository: CrudRepository<any>
    ) {}

    async execute(dto: UserFindByEmailInput): Promise<UserFindByEmailOutput> {
        return this.repository.findUserByEmail(dto.email);
    }
}