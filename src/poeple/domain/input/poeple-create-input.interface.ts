export class PoepleCreateInput {
    name: string;
    gender: string;
    maritalStatus: string;
    birthDate: Date;
    addresses?: AddressCreateInput[];
}

export class AddressCreateInput {
    postalCode: string;
    number: string;
    street: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
}