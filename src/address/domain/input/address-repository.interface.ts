import { CrudRepository } from "src/commons/crud-repository.interface";
import { Address } from "src/poeple/domain/entities/address.entity";

export interface AddressRepository extends CrudRepository<Address> {}