import { PoepleFindInput } from "../input/poeple-find-input.interface";
import { Usecase } from "src/commons/usecase.interface";
import { PoepleFindOutput } from "../output/poeple-find-output.interface";
import { PoepleRepository } from "../input/poeple-repository.interface";
import { Inject } from "@nestjs/common";

export class PoepleFindUsecase implements Usecase<PoepleFindInput, PoepleFindOutput> {
    constructor(
        @Inject('PoepleRepository')
        private repository: PoepleRepository
    ) {}

    async execute(dto: PoepleFindInput): Promise<PoepleFindOutput> {

        const poeple = await this.repository.find(dto);
        return [...poeple]
    }
}