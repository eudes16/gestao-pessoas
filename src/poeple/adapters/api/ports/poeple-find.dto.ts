import { IsIn, IsOptional } from "class-validator";
import { Filter, Response, PaginationOutput, Pagination } from "src/commons/request/query.interface";
import { Poeple } from "src/poeple/domain/entities/poeple.entity";


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

export class PoepleFindDto implements Pagination<Poeple>, Filter<Poeple> {
    @IsOptional()
    id_eq?: number;
    id_not_eq?: number;
    id_in?: number[];
    id_not_in?: number[];
    id_lt?: number;
    id_lte?: number;
    id_gt?: number;
    id_gte?: number;
    
    name_eq?: string;
    name_not_eq?: string;
    name_in?: string[];
    name_not_in?: string[];
    name_contains?: string;
    name_not_contains?: string;
    name_starts_with?: string;
    name_not_starts_with?: string;
    name_ends_with?: string;
    name_not_ends_with?: string;
    name_is_empty?: string;

    @IsOptional()
    @IsIn(["male", "female"])
    gender_eq?: string;
    
    @IsOptional()
    @IsIn(["male", "female"])
    gender_not_eq?: string;
    
    @IsOptional()
    @IsIn(["male", "female"])
    gender_in?: string[];

    @IsOptional()
    @IsIn(["male", "female"])
    gender_not_in?: string[];
    
    @IsOptional()
    @IsIn(["single", "married", "divorced", "widower"])
    maritalStatus_eq?: string;

    @IsOptional()
    @IsIn(["single", "married", "divorced", "widower"])
    maritalStatus_not_eq?: string;
    maritalStatus_in?: string[];
    maritalStatus_not_in?: string[];

    @IsOptional()
    birthDate_eq?: string;
    birthDate_not_eq?: string;
    birthDate_lt?: string;
    birthDate_lte?: string;
    birthDate_gt?: string;
    birthDate_gte?: string;


    @IsOptional()
    @IsIn(["addresses"])
    includes?: string[];
 
    @IsOptional()
    limit?: number;

    @IsOptional()
    page?: number;

    @IsOptional()
    orderBy?: { 
        id?: "ASC" | "DESC"; 
        name?: "ASC" | "DESC"; 
        gender?: "ASC" | "DESC"; 
        maritalStatus?: "ASC" | "DESC"; 
        birthDate?: "ASC" | "DESC"; 
        addresses?: "ASC" | "DESC"; 
        createdAt?: "ASC" | "DESC"; 
        updatedAt?: "ASC" | "DESC"; 
        deletedAt?: "ASC" | "DESC"; 
    };
}