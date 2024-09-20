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
}