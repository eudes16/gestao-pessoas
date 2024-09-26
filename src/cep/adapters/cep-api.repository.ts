import { Inject, Injectable } from "@nestjs/common";
import { HttpClientProvider } from "src/commons/http/http-client.provider";
import { HttpClient } from "src/commons/http/port/http-client.interface";
import { HttpRequest } from "src/commons/http/port/http-request.interface";
import { CepOutput } from "../domain/output/cep-output.interface";

@Injectable()
export class CepApiRepository {
    constructor(
        @Inject('CEP_HTTP_CLIENT_PROVIDER') private client: HttpClient
    ) {
    }

    async findCep(cep: number): Promise<CepOutput> {
        const request: HttpRequest = {
            url: `/${cep}/json`,
            headers: {
                'Content-Type': 'application/json',
            }
        }
        try {
            const response = await this.client.get(request);
            return response.data;
        } catch (error) {
            console.error(error);            
        }
    }
}