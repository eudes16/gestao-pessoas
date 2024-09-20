import { Usecase } from "src/commons/usecase.interface";
import { PoepleRepository } from "../input/poeple-repository.interface";
import { Inject } from "@nestjs/common";
import { Poeple } from "../entities/poeple.entity";
import { PoepleDeleteInput } from "../input/poeple-delete-input.interface";
import { PoepleDeleteOutput } from "../output/poeple-delete-output.interface";
import { NotFoundException } from "src/commons/errors/not-found.exception";

export class PoepleDeleteUsecase implements Usecase<PoepleDeleteInput, PoepleDeleteOutput> {
    constructor(
        @Inject('PoepleRepository')
        private repository: PoepleRepository
    ) { }

    async execute(dto: PoepleDeleteInput): Promise<PoepleDeleteOutput> {
        const toDelete = await this.repository.findById(dto.id);

        if (!toDelete) {
            throw new NotFoundException('Poeple not found');
        }

        const poeple = await this.repository.delete(dto.id);
        return poeple;
    }
}