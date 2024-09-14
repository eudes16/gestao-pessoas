import { JwtModule, JwtService } from "@nestjs/jwt";
import { InMemoryUserRepository } from "./../../../user/adapters/db/in-memory-user.repository";
import { LoginUsecase } from "./login.usecase";
import { Test } from "@nestjs/testing";
import { UserFindByEmailOutput } from "src/user/domain/output/user-find-by-email-output.interface";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "./../../../config/configuration";
import { Encryt } from "./../../../commons/encryt";

describe("LoginUsecase", () => {
    let usecase: LoginUsecase;
    let repository: InMemoryUserRepository;
    let jwtService: JwtService;
    let encrypt: Encryt;

    beforeEach(async () => {
        const moduleRefEnv = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                load: [configuration]
              }),],
        }).compile();

        const configService = moduleRefEnv.get<ConfigService>(ConfigService);

        const secret = configService.get<string>('secret');

        const moduleRef = await Test.createTestingModule({
            imports: [JwtModule.register({
                global: true,
                secret: secret,
                signOptions: { expiresIn: '60m' },
              }),],
            providers: [
                ConfigService,
                InMemoryUserRepository, 
                Encryt,
            ]
        }).compile();
        
        repository = moduleRef.get<InMemoryUserRepository>(InMemoryUserRepository);
        jwtService = moduleRef.get<JwtService>(JwtService);
        encrypt = moduleRef.get<Encryt>(Encryt);

        usecase = new LoginUsecase(repository, jwtService, encrypt);

        const expectedResult: UserFindByEmailOutput = {
            id: 1,
            name: "User 1",
            email: "user1@mail.com",
            password: encrypt.passwordEncode("123456"),
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
        };

        await repository.create(expectedResult)
    });

    describe("execute", () => {

        it("should throw a NotFoundException", async () => {
            const input = {
                email: "eudes.vss@gmail.com",
                password: "123456",
            };

            expect(usecase.execute(input)).rejects.toThrow(new NotFoundException("User not found"));
        });

        it("should throw a UnauthorizedException", async () => {
            const input = {
                email: "user1@mail.com",
                password: "12345622",
            };

            expect(usecase.execute(input)).rejects.toThrow(new UnauthorizedException("Invalid password"));
        });

        it("should return a token", async () => {
            const input = {
                email: "user1@mail.com",
                password: "123456",
            };

            const result = await usecase.execute(input);

            expect(result.token).toBeDefined();
        });

        it("should a valid jwt token", async () => {
            const input = {
                email: "user1@mail.com",
                password: "123456",
            };

            const result = await usecase.execute(input);

            const decoded = await jwtService.verifyAsync(result.token);
            expect(decoded.email).toBe(input.email);
        });
    });
});