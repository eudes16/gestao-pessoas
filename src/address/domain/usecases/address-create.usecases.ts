import { Usecase } from "src/commons/usecase.interface";
import { AddressCreateInput } from "../input/address-create-input.interface";
import { AddressCreateOutput } from "../output/addres-create-output.interface";
import { AddressRepository } from "../input/address-repository.interface";
import { Inject } from "@nestjs/common";
import { Address } from "../entities/address.entity";
import { PoepleFindUsecase } from "src/poeple/domain/usecases/poeple-find.usecase";
import { PoepleDbRepository } from "src/poeple/adapters/db/poeple-db.repository";
import prismaClient from "src/commons/prisma-client";
import { PrismaClient } from "@prisma/client";
import { NotFoundException } from "src/commons/errors/not-found.exception";

export class AddressCreateUseCase implements Usecase<AddressCreateInput, AddressCreateOutput> {
    constructor(
        @Inject('AddressRepository') private repository: AddressRepository,
    ) {
    }

    async execute(dto: AddressCreateInput): Promise<AddressCreateOutput> {
        const address = new Address();
        address.postalCode = dto.postalCode;
        address.number = dto.number;
        address.street = dto.street;
        address.complement = dto?.complement;
        address.neighborhood = dto.neighborhood;
        address.city = dto.city;
        address.state = dto.state;

        const poepleFindUsecase = new PoepleFindUsecase(new PoepleDbRepository(prismaClient as PrismaClient));
        const poeple: any = await poepleFindUsecase.execute({ id_eq: dto.poepleId } as any);
        
        if (!poeple?.length) {
            throw new NotFoundException('Poeple not found');
        }

        address.poepleId = poeple[0].id;

        const result = await this.repository.create(address);

        if (result) {
            return result;
        }
    }
}