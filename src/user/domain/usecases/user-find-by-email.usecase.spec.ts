import { Test } from "@nestjs/testing";
import { UserFindByEmailInput } from "../input/user-find-by-email-input.interface";
import { UserFindByEmailOutput } from "../output/user-find-by-email-output.interface";
import { UserFindByEmailUsecase } from "./user-find-by-email.usecase";
import { InMemoryUserRepository } from "./../../adapters/db/in-memory-user.repository";
import { UserRepository } from "../input/user-repository.interface";

describe("UserFindByEmailUsecase", () => {
    let usecase: UserFindByEmailUsecase;
    let repository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [InMemoryUserRepository]
        }).compile();

        repository = moduleRef.get<InMemoryUserRepository>(InMemoryUserRepository);
        usecase = new UserFindByEmailUsecase(repository);

        const expectedResult: UserFindByEmailOutput = {
            id: 1,
            name: "User 1",
            email: "user1@mail.com",
            password: "123456",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };

        await repository.create(expectedResult)
    });

    describe("execute", () => {
        it("should return a user", async () => {
            const expectedResult: UserFindByEmailOutput = {
                id: 1,
                name: "User 1",
                email: "user1@mail.com",
                password: "123456",
                createdAt: new Date(),
                updatedAt: new Date(),
                deletedAt: null,
            };

            const input: UserFindByEmailInput = {
                email: "user1@mail.com",
            };

            const result = await usecase.execute(input);

            expect(await usecase.execute(input)).toEqual(result);
        });
        
    });


});