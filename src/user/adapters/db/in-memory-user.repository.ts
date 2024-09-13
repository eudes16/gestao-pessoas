import { Injectable } from "@nestjs/common";
import { CrudRepository } from "src/commons/crud-repository.interface";
import { User } from "./../../domain/entities/user.entity";

let userId = 1;

const generateUserId = () => userId++;

@Injectable()
export class InMemoryUserRepository implements CrudRepository<User> {
    users: User[];

    constructor() {
        this.users = [];
    }

    async find(): Promise<User[]> {
        return this.users.filter(user => !user.deletedAt) || [];
    }

    async findById(id: number): Promise<User | null> {
        return this.users.find(user => user.id === id && !user.deletedAt) || null;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email && !user.deletedAt) || null;
    }

    async create(data): Promise<User> {
        const user = new User();
        user.id = generateUserId();
        user.email = data.email;
        user.password = data.password;
        user.name = data.name;
        user.createdAt = new Date();
        this.users.push(user);
        return user;
    }

    async update(id, data): Promise<User> {
        const user = this.users.find(user => user.id === id && !user.deletedAt);
        if (!user) {
            throw new Error("User not found");
        }

        if (data.email) {
            const userWithSameEmail = this.users.find(user => user.email === data.email && !user.deletedAt);
            if (userWithSameEmail && userWithSameEmail.id !== id) {
                throw new Error("Email already in use");
            }
        }

        if (data.password) {
            user.password = data.password;
        }

        if (data.name) {
            user.name = data.name;
        }

        
        if (JSON.stringify(data) !== JSON.stringify(user)) {
            user.updatedAt = new Date();
        }

        return user;
    }

    async delete(id: number): Promise<User> {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new Error("User not found");
        }

        const user = this.users[userIndex];
        user.deletedAt = new Date();
        this.users[userIndex] = user;
        return user;
    }
    

}