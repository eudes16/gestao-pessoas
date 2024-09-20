import { Poeple } from "src/poeple/domain/entities/poeple.entity";
import { InMemoryPoepleRepository } from "./in-memory-poeple.repository";
import { Repository } from "src/commons/repository.interface";
import { CrudRepository } from "src/commons/crud-repository.interface";

describe("InMemoryPoepleRepository", () => {
    let repository: CrudRepository<Poeple>;
    let poeples: Poeple[];

    beforeEach(() => {
        repository = new InMemoryPoepleRepository();
        poeples = [
            {
                name: "John Doe",
                gender: "male",
                maritalStatus: "single",
                birthDate: new Date("1983-01-01"),
                address: [],
                createdAt: new Date()
            },
            {
                name: "Jane Doe",
                gender: "female",
                maritalStatus: "married",
                birthDate: new Date("1985-01-01"),
                address: [],
                createdAt: new Date()
            },
            {
                name: "Jack Doe",
                gender: "male",
                maritalStatus: "married",
                birthDate: new Date("1987-01-01"),
                address: [],
                createdAt: new Date()
            },
        ];

        poeples.forEach(async poeple => await repository.create(poeple));
    });


    describe("find", () => {
        it("should return a list of poeple", async () => {
            const result = await repository.find();

            expect(result).toHaveLength(3);
        });

        it("should return a empty list", async () => {
            repository.poeple = [];
            const resultPoeple = await repository.find();
            expect(resultPoeple).toHaveLength(0);
        });
    });

    describe("findById", () => {
        it("should return a poeple", async () => {
            const poeple = await repository.find();
            const result = await repository.findById(poeple[0].id);

            expect(result).toEqual(poeple[0]);
        });
        
        it("should throw an error when poeple does not exist", async () => {
            try {
                await repository.findById(999);
            } catch (error) {
                expect(error.message).toEqual("Poeple with id 999 not found.");
            }            
        });
    });

    describe("findByName", () => {
        it("should return a poeple", async () => {
            const poeple = await repository.find();
            const result = await repository.findByName(poeple[0].name);

            expect(result).toEqual(poeple[0]);
        });

        it("should throw an error when poeple does not exist", async () => {
            try {
                await repository.findByName("Poeple 999");
            } catch (error) {
                expect(error.message).toEqual("Poeple with name Poeple 999 not found.");
            }
        });
    });

    describe("create", () => {
        it("should create a poeple", async () => {
            const poeple: Poeple = {
                name: "Poeple 4",
                gender: "male",
                maritalStatus: "married",
                birthDate: new Date("1987-01-01"),
                address: [],
                createdAt: new Date()
            }

            const result = await repository.create(poeple);

            const resultPoeple = await repository.findByName(poeple.name);

            expect(resultPoeple.name).toEqual(result.name);
        });

    });

    describe("update", () => {
        it("should update a poeple", async () => {
            const poeple = await repository.find();
            const newPoeple = {
                ...poeple[0],
                name: "John Doeoe",
            }

            const result = await repository.update(poeple[0].id, newPoeple);

            expect(result.name).toEqual(newPoeple.name);

        });

        it("should throw an error when poeple does not exist", async () => {
            try {
                await repository.update(999, {
                    name: "Poeple 999",
                    gender: "female",
                    maritalStatus: "single",
                    birthDate: new Date("1983-01-01"),
                    address: [],
                    createdAt: new Date()
                });
            } catch (error) {
                expect(error.message).toEqual("Poeple with id 999 not found.");
            }
        });
    });

    describe("delete", () => {
        it("should delete a poeple", async () => {
            const poeples = await repository.find();
            const poeple = poeples[0];
            const result = await repository.delete(poeple.id);
            
            const newPoeples = await repository.find();
            const deletedPoeple = newPoeples.find(p => p.id === poeple.id);
            expect(deletedPoeple).toBeUndefined();
        });

        it("should throw an error when poeple does not exist", async () => {
            try {
                await repository.delete(999);
            } catch (error) {
                expect(error.message).toEqual("Poeple with id 999 not found.");
            }
        });
    });
});