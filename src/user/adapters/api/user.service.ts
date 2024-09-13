import { Injectable } from '@nestjs/common';
import { Service } from 'src/commons/service.interface';
import { UserFindByEmailInput } from 'src/user/domain/input/user-find-by-email-input.interface';
import { UserFindByEmailOutput } from 'src/user/domain/output/user-find-by-email-output.interface';
import { UserFindByEmailUsecase } from 'src/user/domain/usecases/user-find-by-email.usecase';
import { UserDbRepository } from '../db/user-db.repository';

@Injectable()
export class UserService implements Service {
    constructor(
        private repository: UserDbRepository,
    ) { }

    async findUserByMail(dto: UserFindByEmailInput): Promise<UserFindByEmailOutput> {
        const useCases = new UserFindByEmailUsecase(this.repository);
        const result = await useCases.execute(dto);
        return result;
    }
}
