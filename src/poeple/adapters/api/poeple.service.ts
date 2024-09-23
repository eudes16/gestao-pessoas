import { Service } from "src/commons/service.interface";
import { PoepleCreateOutput } from "src/poeple/domain/output/poeplle-create-output.interface";
import { PoepleFindDto, PoepleFindResponse } from "./ports/poeple-find.dto";
import { PoepleFindUsecase } from "src/poeple/domain/usecases/poeple-find.usecase";
import { Inject } from "@nestjs/common";
import { PoepleDbRepository } from "../db/poeple-db.repository";
import { PoepleCreateUsecase } from "src/poeple/domain/usecases/poeple-create.usecase";
import { PoepleUpdateUsecase } from "src/poeple/domain/usecases/poeple-update.usecase";
import { PoepleUpdateOutput } from "src/poeple/domain/output/poeple-update-output.interface";
import { PoepleDeleteUsecase } from "src/poeple/domain/usecases/poeple-delete.usecase";
import { PoepleDeleteOutput } from "src/poeple/domain/output/poeple-delete-output.interface";
import responseProvider from "src/commons/response/response.provider";

export class PoepleService implements Service {
    constructor (
        @Inject('PoepleRepository')
        private repository: PoepleDbRepository
    ) {}

    async create(poepleCreateInput): Promise<PoepleCreateOutput> {
        const useCase = new PoepleCreateUsecase(this.repository);

        const result = await useCase.execute(poepleCreateInput);
        return result;
    }

    async delete(poepleDeleteInput): Promise<PoepleDeleteOutput> {
        const useCase = new PoepleDeleteUsecase(this.repository);

        const result = await useCase.execute(poepleDeleteInput);
        return result;
    }

    async update(poepleUpdateInput): Promise<PoepleUpdateOutput> {
        const useCase = new PoepleUpdateUsecase(this.repository);
        
        const result = await useCase.execute(poepleUpdateInput);
        return result;
    }

    async find(dto: PoepleFindDto): Promise<PoepleFindResponse> {
        const { page, limit } = dto
        
        const useCase = new PoepleFindUsecase(this.repository);

        const poepleFindInput: any = dto
        const records: any = await useCase.execute(poepleFindInput);
        const count = await this.repository.count(dto);

        return responseProvider(records, count, limit, page)
    }

    
}