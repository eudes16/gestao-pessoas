import { CrudRepository } from "src/commons/crud-repository.interface";
import { User } from "../entities/user.entity";

export interface UserRepository extends CrudRepository<User> { 
    findUserByEmail(email: string): Promise<User>;
}
