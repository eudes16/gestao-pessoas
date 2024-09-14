import { Inject } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { CrudRepository } from "src/commons/crud-repository.interface";
import { User } from "src/user/domain/entities/user.entity";

export class UserDbRepository implements CrudRepository<User> {
    constructor(
        @Inject('CONNECTION') private connection: PrismaClient
    ) {}

    async find(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithAggregationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;

        where.deletedAt = null;
        const users = await this.connection.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy
        });


        return users as User[];
    }

    async findById(id: number): Promise<User> {
        return await this.connection.user.findUnique({
            where: { id, deletedAt: null }
        });
    }

    async findUserByEmail(email: string): Promise<User> {
        return await this.connection.user.findFirst({
            where: { email, deletedAt: null }
        });
    }

    async create(data: User): Promise<User> {
        return await this.connection.user.create({
            data
        });
    }

    async update(id: number, data: User): Promise<User> {
        return await this.connection.user.update({
            where: { id, deletedAt: null },
            data
        });
    }

    async delete(id: number): Promise<User> {
        return this.connection.user.delete({
            where: { id }
        });
    }
}