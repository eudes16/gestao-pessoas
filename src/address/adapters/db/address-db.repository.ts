import { Inject } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { Address } from "src/address/domain/entities/address.entity";
import { AddressRepository } from "src/address/domain/input/address-repository.interface";
import { NotFoundException } from "src/commons/errors/not-found.exception";
import queryProvider from "src/commons/request/query.provider";
// import { Address } from "src/poeple/domain/entities/address.entity";

export class AddressDbRepository implements AddressRepository {

    constructor(
        @Inject('CONNECTION')
        private connection: PrismaClient
    ) { }

    async count(args: any): Promise<number> {
        const { where } = queryProvider(args)
        return await this.connection.address.count({ where });
    }

    async find(args: any): Promise<Address[]> {
        const { where, pagination, include } = queryProvider(args)

        const { skip, take } = pagination;

        const result: any = await this.connection.address.findMany({
            where,
            take,
            skip,
            include,
        })
        return result;
    }

    async findById(id: number): Promise<Address> {
        const result = await this.connection.address.findFirst({
            where: { id }
        });

        return result;
    }

    async create(data: Address): Promise<Address> {
        const addressToSave: any = {
            postalCode: data.postalCode,
            number: data.number,
            street: data.street,
            complement: data.complement,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
            poepleId: data.poepleId
        }

        const result = await this.connection.address.create({
            data: addressToSave
        });

        return result;
    }

    async update(id: number, data: Partial<Address>): Promise<Address> {
        const addressToSave: any = {
            postalCode: data.postalCode,
            number: data.number,
            street: data.street,
            complement: data.complement,
            neighborhood: data.neighborhood,
            city: data.city,
            state: data.state,
        }

        const result = await this.connection.address.update({
            where: { id },
            data: addressToSave
        });

        return result;

    }

    async delete(id: number): Promise<Address> {
        const address = await this.connection.address.findUnique({ where: { id } });

        if (!address) {
            throw new NotFoundException("Address not found");
        }

        const toUpdateAddress: Prisma.AddressUpdateInput = {
            ...address,
            deletedAt: new Date(),
        }

        const result = await this.connection.address.update({
            where: { id },
            data: toUpdateAddress
        });

        return result;
    }

}