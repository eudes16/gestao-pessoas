import { Address } from "./address.entity";

export class Poeple {
    id?: number;
    name: string;
    gender: string;
    maritalStatus: string;
    birthDate: Date;
    address?: Address[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}