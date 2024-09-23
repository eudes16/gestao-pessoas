import { Address } from "src/address/domain/entities/address.entity";
import { Filter, Pagination, PaginationOutput, Response } from "src/commons/request/query.interface";

export interface AddressQuery extends Filter<Omit<Address, "poeple">>, Pagination {
    
}

export interface AddressFindDto extends AddressQuery  {
    includes?: string[];
}

export class AddressFindOutput {
    id?: number;
    postalCode?: string;
    number?: string;
    street?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    createdAt?: Date;
}

export interface AddressFindResponse extends Response<AddressFindOutput[]> {
    pagination?: PaginationOutput;
}