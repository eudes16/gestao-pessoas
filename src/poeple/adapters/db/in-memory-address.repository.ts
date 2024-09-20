import { CrudRepository } from "src/commons/crud-repository.interface";
import { Address } from "src/poeple/domain/entities/address.entity";

let addressId = 1;

const nextId = () => addressId++;

export class InMemoryAddressRepository implements CrudRepository<Address> {
    addresses: Address[] = [];

    constructor() {
        this.addresses = [];
    }
    
    async find(...args: any): Promise<Address[]> {
        return this.addresses;
    }

    async findById(id: number): Promise<Address> {
        const address = this.addresses.find(a => a.id === id);
        if (!address) {
            throw new Error(`Address with id ${id} not found.`);
        }
        return address;
    }

    async create(data: Address): Promise<Address> {
        const newAddress = { ...data, id: nextId() };
        this.addresses.push(newAddress);
        return newAddress;
    }

    async update(id: number, data: Address): Promise<Address> {
        const index = this.addresses.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error(`Address with id ${id} not found.`);
        }
        const updatedAddress = { ...data, id };
        this.addresses[index] = updatedAddress;
        return updatedAddress;
    }

    async delete(id: number): Promise<Address> {
        const index = this.addresses.findIndex(a => a.id === id);
        if (index === -1) {
            throw new Error(`Address with id ${id} not found.`);
        }
        const deletedAddress = this.addresses.splice(index, 1)[0];
        return deletedAddress;
    }

}