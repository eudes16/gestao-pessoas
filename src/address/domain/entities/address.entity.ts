import { Poeple } from "src/poeple/domain/entities/poeple.entity";

export class Address {
    id: number;
    poepleId: number;
    postalCode: string;
    number: string;
    street: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    poeple?: Poeple
}