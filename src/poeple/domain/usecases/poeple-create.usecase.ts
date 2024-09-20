import { Inject } from "@nestjs/common";
import { Poeple } from "../entities/poeple.entity";
import { PoepleCreateInput } from "../input/poeple-create-input.interface";
import { PoepleRepository } from "../input/poeple-repository.interface";
import { PoepleCreateOutput } from "../output/poeplle-create-output.interface";
import { Address } from "../entities/address.entity";

export class PoepleCreateUsecase {
    
    constructor(
        @Inject('PoepleRepository')
        private poepleRepository: PoepleRepository
    ) {}

    async execute(input: PoepleCreateInput): Promise<PoepleCreateOutput> {
        const poeple = new Poeple();
        poeple.name = input.name;
        poeple.gender = input.gender;
        poeple.maritalStatus = input.maritalStatus;
        poeple.birthDate = input.birthDate;
        
        if (input?.address?.length) {
            poeple.address = input.address.map(address => {
                const addr = new Address();
                addr.postalCode = address.postalCode;
                addr.number = address.number;
                addr.street = address.street;
                addr.complement = address.complement;
                addr.neighborhood = address.neighborhood;
                addr.city = address.city;
                addr.state = address.state;
                return addr;
            });
        }

        const result = await this.poepleRepository.create(poeple);

        if (result) {
            return result;
        }
        

    }
}