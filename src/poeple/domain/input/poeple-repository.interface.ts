import { CrudRepository } from "src/commons/crud-repository.interface";
import { Poeple } from "../entities/poeple.entity";

export interface PoepleRepository extends CrudRepository<Poeple> {
    findByName(name: string): Promise<Poeple>;
}