import { Test } from "@nestjs/testing";
import { PoepleFindUsecase } from "./poeple-find.usecase";
import { PoepleRepository } from "../input/poeple-repository.interface";
import { InMemoryPoepleRepository } from "./../../adapters/db/in-memory-poeple.repository";
import { PoepleFindInput } from "../input/poeple-find-input.interface";
import { Poeple } from "../entities/poeple.entity";

describe("PoepleFindUsecase", () => {
    let usecase: PoepleFindUsecase;
    let repository: PoepleRepository;
    const expectedResult: Poeple = {
        id: 1,
        name: "John Doe",
        gender: "male",
        maritalStatus: "single",
        birthDate: new Date("1983-01-01"),
        createdAt: new Date(),
    }            

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [InMemoryPoepleRepository]
        }).compile();

        repository = moduleRef.get<InMemoryPoepleRepository>(InMemoryPoepleRepository);
        usecase = new PoepleFindUsecase(repository);


        await repository.create(expectedResult);
    });

    describe("execute", () => {
        it("should return a list of poeple", async () => {
             const result = await usecase.execute({} as PoepleFindInput);    
             expect(result).toHaveLength(1); 
        });

        it("should return a empty list", async () => {
            repository.poeple = [];
            const resultPoeple = await usecase.execute({} as PoepleFindInput);
            expect(resultPoeple).toHaveLength(0);
        });

        it("should return a list of poeple filtered by name", async () => {
            const result = await usecase.execute({ name: "John Doe" } as PoepleFindInput);
            expect(result).toHaveLength(1);
        });
    });
});