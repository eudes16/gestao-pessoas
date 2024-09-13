import { Repository } from "./repository.interface";

export interface CrudRepository<T = any> extends Repository<T> {
    find(...args: any): Promise<T[]>;
    findById(id: number): Promise<T>;
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<T>;
}