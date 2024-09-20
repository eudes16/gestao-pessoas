import { Repository } from "src/commons/repository.interface";
import { User } from "src/user/domain/entities/user.entity";
import { InMemoryUserRepository } from "./in-memory-user.repository";
import { UserRepository } from "src/user/domain/input/user-repository.interface";

describe("InMemoryUserRepository", () => {
    let repository: UserRepository;
    let users: User[];

    beforeEach(() => {
        repository = new InMemoryUserRepository();

        users  = [
            {
                name: "User 1",
                email: "user1@mail.com",
                password: "123456",
                createdAt: new Date(),
            },
            {
                name: "User 2",
                email: "user2@mail.com",
                password: "abcdef",
                createdAt: new Date(),
            },
            {
                name: "User 3",
                email: "user3@mail.com",
                password: "123def",
                createdAt: new Date(),
            },
        ];

        users.forEach(async user => await repository.create(user));

    });

    describe("find", () => {
        it("should return a list of users", async () => {
            const result = await repository.find();

            expect(result).toHaveLength(3);
        });

        it("should return a empty list", async () => {
            repository.users = [];
            const resultUsers = await repository.find();
            expect(resultUsers).toHaveLength(0);
        });
    });

    describe("findById", () => {
        it("should return a user", async () => {
            const user = await repository.find();
            const result = await repository.findById(user[0].id);

            expect(result).toEqual(user[0]);
        });
    });

    describe("findUserByEmail", () => {
        it("should return a user", async () => {
            const user = await repository.find();
            const result = await repository.findUserByEmail(user[0].email);

            expect(result).toEqual(user[0]);
        });
    });

    describe("create", () => {
        it("should create a user", async () => {
            const user: User = {
                name: "User 4",
                email: "user4@mail.com",
                password: "123456",
                createdAt: new Date(),
            };

            const result = await repository.create(user);

            const resultUser = await repository.findUserByEmail(user.email);

            expect(resultUser).toEqual(result);
        });
    });

    describe("update", () => {
        it("should update a user", async () => {
            const users = await repository.find();

            const user = users[0];

            const result = await repository.update(user.id!, { ...user, name: "User 1 updated" });

            expect(result.name).toEqual("User 1 updated");
        });

        it("should throw an error when user does not exist", async () => {
            try {
                await repository.update(999, { 
                    name: "User 999",
                    email: "user999@mail.com",
                    password: "123456",
                    createdAt: new Date(), 
                });
            } catch (error) {
                expect(error.message).toEqual("User not found");
            }
        });
    });

    describe("delete", () => {
        it("should delete a user", async () => {
            const user = await repository.find();
            const result = await repository.delete(user[0].id);

            const resultUser = await repository.findUserByEmail(user[0].email);
            
            expect(result.deletedAt).toBeDefined();

            expect(resultUser).toBeNull();
        });

        it("should return a list without the deleted user", async () => {
            const user = await repository.find();
            await repository.delete(user[0].id);

            const result = await repository.find();

            expect(result).toHaveLength(2);
        });
    });

})