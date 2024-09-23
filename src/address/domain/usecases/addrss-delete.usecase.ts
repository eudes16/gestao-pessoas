import { Usecase } from "src/commons/usecase.interface";
import { AddressDeleteInput } from "../input/address-delete-input.interface";
import { AddressDeleteOutput } from "../output/address-delete-output.interface";
import { Inject, NotFoundException } from "@nestjs/common";
import { AddressRepository } from "../input/address-repository.interface";

export class AddressDeleteUsecase implements Usecase<AddressDeleteInput, AddressDeleteOutput> {

    constructor(
        @Inject('AddressRepository') private repository: AddressRepository
    ) { }

    async execute(dto: AddressDeleteInput): Promise<AddressDeleteOutput> {
        const toDelete = await this.repository.findById(dto.id);

        if (!toDelete) {
            throw new NotFoundException('Address not found');
        }

        const address = await this.repository.delete(dto.id);
        return address;
    }
}