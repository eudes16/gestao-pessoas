import { CrudRepository } from "src/commons/crud-repository.interface";
import { Poeple } from "src/poeple/domain/entities/poeple.entity";
import { PoepleRepository } from "src/poeple/domain/input/poeple-repository.interface";

let poepleId = 1;

const nextId = () => poepleId++;

export class InMemoryPoepleRepository implements PoepleRepository {
    poeple: Poeple[] = []

    constructor() {
        this.poeple = [];
    }
    
    async find(...args: any): Promise<Poeple[]> {
        return this.poeple || [];
    }

    async findById(id: number): Promise<Poeple> {
        const poeple = this.poeple.find(p => p.id === id);
        if (!poeple) {
            throw new Error(`Poeple with id ${id} not found.`);
        }
        return poeple;
    }

    async findByName(name: string): Promise<Poeple> {
        const poeple = this.poeple.find(p => p.name === name);
        if (!poeple) {
            throw new Error(`Poeple with name ${name} not found.`);
        }
        return poeple;
    }

    async create(data: Poeple): Promise<Poeple> {
        const newPoeple = {
            id: nextId(),
            ...data
        };
        this.poeple.push(newPoeple);
        return newPoeple;
    }

    async update(id: number, data: Poeple): Promise<Poeple> {
        const index = this.poeple.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error(`Poeple with id ${id} not found.`);
        }

        const updatedPoeple = {
            ...this.poeple[index],
            ...data
        };
        this.poeple[index] = updatedPoeple;
        return updatedPoeple;
    }

    async delete(id: number): Promise<Poeple> {
        const index = this.poeple.findIndex(p => p.id === id);
        if (index === -1) {
            throw new Error(`Poeple with id ${id} not found.`);
        }

        const deletedPoeple = this.poeple[index];
        this.poeple.splice(index, 1);
        return deletedPoeple;
    }


    // async create(poeple) {
    //     const newPoeple = {
    //         id: nextId(),
    //         ...poeple
    //     };
    //     this.poeple.push(newPoeple);
    //     return newPoeple;
    // }

    // async update(id, poeple) {
    //     const index = this.poeple.findIndex(p => p.id === id);
    //     if (index === -1) {
    //         return null;
    //     }

    //     const newPoeple = {
    //         ...this.poeple[index],
    //         ...poeple
    //     };
    //     this.poeple[index] = newPoeple;
    //     return newPoeple;
    // }

    // async delete(id) {
    //     const index = this.poeple.findIndex(p => p.id === id);
    //     if (index === -1) {
    //         return null;
    //     }

    //     const poeple = this.poeple[index];
    //     this.poeple = this.poeple.filter(p => p.id !== id);
    //     return poeple;
    // }

}