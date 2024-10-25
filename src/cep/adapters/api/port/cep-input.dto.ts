import { Length } from "class-validator";
import { CepInput } from "./cep-input.interface";

export class CepInputDto implements CepInput {
    @Length(8, 8)
    cep: string;
}