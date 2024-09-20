import { PoepleUpdateInput } from "../input/poeple-update-input.interface";
import { Usecase } from "src/commons/usecase.interface";
import { PoepleUpdateOutput } from "../output/poeple-update-output.interface";
import { PoepleRepository } from "../input/poeple-repository.interface";
import { Inject } from "@nestjs/common";
import { Poeple } from "../entities/poeple.entity";

export class PoepleUpdateUsecase implements Usecase<PoepleUpdateInput, PoepleUpdateOutput> {
    constructor(
        @Inject('PoepleRepository')
        private repository: PoepleRepository
    ) { }

    async execute(dto: PoepleUpdateInput): Promise<PoepleUpdateOutput> {
        const toUpdate: Poeple = new Poeple();

        if (dto.name) {
            toUpdate.name = dto.name;
        }

        if (dto.gender) {
            toUpdate.gender = dto.gender
        }

        if (dto.maritalStatus) {
            toUpdate.maritalStatus = dto.maritalStatus
        }

        if (dto.birthDate) {
            toUpdate.birthDate = dto.birthDate
        }

        try {
            const poeple = await this.repository.update(dto.id, toUpdate);
            return poeple;
        } catch (error) {
                        
        }
    }
}