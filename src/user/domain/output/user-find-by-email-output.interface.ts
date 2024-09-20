import { User } from "../entities/user.entity";

export interface UserFindByEmailOutput extends User{
    id?: number;
    email: string;
    name: string;
    password?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}