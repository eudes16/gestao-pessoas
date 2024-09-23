import { Inject } from "@nestjs/common";
import { PoepleGender, Prisma, PrismaClient } from "@prisma/client";
import { NotFoundException } from "src/commons/errors/not-found.exception";
import queryProvider from "src/commons/request/query.provider";
import { Poeple } from "src/poeple/domain/entities/poeple.entity";
import { PoepleRepository } from "src/poeple/domain/input/poeple-repository.interface";

export class PoepleDbRepository implements PoepleRepository {

    constructor(
        @Inject('CONNECTION')
        private connection: PrismaClient
    ) { }

    async count(args: any): Promise<number> {
        const { where } = queryProvider(args)

        const _where: any = {
            ...where,
            deletedAt: null
        }


        return await this.connection.poeple.count({ where: _where });
    }

    async findByName(name: string): Promise<Poeple> {
        const where = { name };
        return await this.connection.poeple.findFirst({ where });
    }

    async find(args: any): Promise<Poeple[]> {
        const { where, pagination, include } = queryProvider(args)

        const { skip, take } = pagination;

        const result =  await this.connection.poeple.findMany(
            {
                where,
                take,
                skip,
                include,
            }
        );

        return result
    }

    async findById(id: number): Promise<Poeple> {
        const result = await this.connection.poeple.findFirst({
            where: { id }
        });
        return result;
    }

    async create(data: Poeple): Promise<Poeple> {
        const poepleToSave: Prisma.PoepleCreateInput = {
            name: data.name,
            gender: data.gender === "male" ? PoepleGender.male : PoepleGender.female,
            maritalStatus: data.maritalStatus as any,
            birthDate: data.birthDate,
        }

        let address = [];

        if (data.addresses?.length) {
            address = data.addresses.map(address => {
                return {
                    postalCode: address.postalCode,
                    number: address.number,
                    street: address.street,
                    complement: address.complement,
                    neighborhood: address.neighborhood,
                    city: address.city,
                    state: address.state,
                }
            });
            poepleToSave.addresses = {
                createMany: {
                    data: address
                }
            }
        }

        const result = await this.connection.poeple.create({
            data: poepleToSave,
            include: {
                addresses: !!poepleToSave?.addresses?.createMany?.data
            }
        });
        return result;
    }

    async update(id: number, data: Poeple): Promise<Poeple> {
        const fromDbPoeple = await this.connection.poeple.findUnique({ where: { id } });

        if (!fromDbPoeple) {
            throw new NotFoundException("Poeple not found");
        }

        const toUpdatePoeple: Prisma.PoepleUpdateInput = {
            ...fromDbPoeple,
            name: data.name,
            gender: data.gender === "male" ? PoepleGender.male : PoepleGender.female,
            maritalStatus: data.maritalStatus as any,
            birthDate: data.birthDate,
        }

        const result = await this.connection.poeple.update({
            where: { id },
            data: toUpdatePoeple
        });

        return result;
    }

    async delete(id: number): Promise<Poeple> {
        const fromDbPoeple = await this.connection.poeple.findUnique({ where: { id } });

        if (!fromDbPoeple) {
            throw new NotFoundException("Poeple not found");
        }

        const toUpdatePoeple: Prisma.PoepleUpdateInput = {
            ...fromDbPoeple,
            deletedAt: new Date(),
            name: fromDbPoeple.name,
        }

        const result = await this.connection.poeple.update({
            where: { id },
            data: toUpdatePoeple
        });

        return result;
    }

}