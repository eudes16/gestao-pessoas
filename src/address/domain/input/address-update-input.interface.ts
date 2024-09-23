export interface AddressUpdateInput {
    id?: number;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    complement?: string;
    poepleId: number;
}