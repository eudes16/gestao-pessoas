export interface Repository<T> {
    [x: string]: any;
}

export const Repository = Symbol('Repository');