import { Usecase } from "src/commons/usecase.interface";
import { AddressFindInput } from "../input/address-find-input.interface";
import { AddressFindOutput } from "../output/address-find-output.interface";
import { AddressRepository } from "../input/address-repository.interface";
import { Inject } from "@nestjs/common";

export class AddressFindUseCase implements Usecase<AddressFindInput, AddressFindOutput> {
    constructor(
        @Inject('AddressRepository')
        private repository: AddressRepository
    ) {}

    async execute(dto: AddressFindInput): Promise<AddressFindOutput> {
        const addresses = await this.repository.find(dto);
        return [...addresses]
    }
}