import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { Auth } from "./auth.interface";

export class AuthInputDto implements Auth {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8, 20)
    password: string;
}