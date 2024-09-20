export type FilterIn<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_in`
    ]?: any
}

export type FilterNotIn<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_not_in`
    ]?: any
}

export type FilterLt<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_lt`
    ]?: any
}

export type FilterLte<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_lte`
    ]?: any
}

export type FilterGt<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_gt`
    ]?: any
}

export type FilterGte<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_gte`
    ]?: any
}

export type FilterContains<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_contains`
    ]?: any
}

export type FilterNotContains<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_not_contains`
    ]?: any
}

export type FilterStartsWith<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_starts_with`
    ]?: any
}

export type FilterNotStartsWith<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_not_starts_with`
    ]?: any
}

export type FilterEndsWith<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_ends_with`
    ]?: any
}

export type FilterNotEndsWith<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_not_ends_with`
    ]?: any
}


export type FilterIs<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_is`
    ]?: any
}

export type FilterNotIs<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_not_is`
    ]?: any
}

export type FilterIsEmpty<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_is_empty`
    ]?: any
}

export type FilterIsSet<T> = {
    [
        Property in keyof T as `${Lowercase<string & Property>}_is_set`
    ]?: any
}


export type  Filter<T> = FilterIn<T> & FilterNotIn<T> & FilterLt<T> & FilterLte<T> & FilterGt<T> & FilterGte<T> 
    & FilterContains<T> & FilterNotContains<T> & FilterStartsWith<T> & FilterNotStartsWith<T> & FilterEndsWith<T> 
    & FilterNotEndsWith<T> & FilterIs<T> & FilterNotIs<T> & FilterIsEmpty<T> & FilterIsSet<T> & {};

export type Pagination = {
    limit?: number;
    page?: number;
    orderBy?: string;
    order?: 'ASC' | 'DESC';
}

export type PaginationOutput = {
    totalPages: number;
    totalItems: number;
    limit: number;
    nextPage?: number;
    currentPage: number;
    prevPage?: number;
}

export type Response<T> = {
    pagination?: PaginationOutput
    records: T;
}