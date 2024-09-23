import { Usecase } from "src/commons/usecase.interface";
import { AddressUpdateInput } from "../input/address-update-input.interface";
import { AddressUpdateOutput } from "../output/addres-update-output.interface";
import { Inject } from "@nestjs/common";
import { AddressRepository } from "../input/address-repository.interface";
import { Address } from "../entities/address.entity";
import { AddressFindUseCase } from "./address-find.usecases";
import { NotFoundException } from "src/commons/errors/not-found.exception";

export class AddressUpdateUsecase implements Usecase<AddressUpdateInput, AddressUpdateOutput> {

    constructor(
        @Inject('AddressRepository') private repository: AddressRepository,
    ) { }

    execute(dto: AddressUpdateInput): Promise<AddressUpdateOutput> {
        const id: number = +dto.id;
        const addresFindUsecase = new AddressFindUseCase(this.repository);
        const address = addresFindUsecase.execute({ id_eq: id } as any);
        
        if (address[0]) {
            throw new NotFoundException('Address not found');
        }

        const addressToUpdate = new Address();

        if (dto.postalCode) {
            addressToUpdate.postalCode = dto.postalCode;
        }

        if (dto.number) {
            addressToUpdate.number = dto.number;
        }

        if (dto.street) {
            addressToUpdate.street = dto.street;
        }

        if (dto.complement) {
            addressToUpdate.complement = dto.complement;
        }

        if (dto.neighborhood) {
            addressToUpdate.neighborhood = dto.neighborhood;
        }

        if (dto.city) {
            addressToUpdate.city = dto.city;
        }

        if (dto.state) {
            addressToUpdate.state = dto.state;
        }

        const result = this.repository.update( id, { ...address[0], ...addressToUpdate});

        if (result) {
            return result;
        }
    }
}