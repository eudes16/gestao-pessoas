import { Filter, Response, PaginationOutput, Pagination } from "src/commons/request/query.interface";
import { Poeple } from "src/poeple/domain/entities/poeple.entity";

export interface PoepleQuery extends Filter<Poeple>, Pagination {
    
}



export interface PoepleFindDto extends PoepleQuery  {
    includes?: string[];
}

export class PoepleFindOutput {
    id?: number;
    name?: string;
    gender?: string;
    maritalStatus?: string;
    birthDate?: Date;
    address?: Address[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export class Address {
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

export interface PoepleFindResponse extends Response<PoepleFindOutput[]> {
    pagination?: PaginationOutput;
}
