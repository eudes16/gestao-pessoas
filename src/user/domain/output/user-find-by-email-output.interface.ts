export interface UserFindByEmailOutput {
    id: number;
    email: string;
    name: string;
    password?: string;
    createdAt: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}