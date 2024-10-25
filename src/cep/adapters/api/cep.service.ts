import { Inject, Injectable } from '@nestjs/common';
import { CepApiRepository } from '../cep-api.repository';

@Injectable()
export class CepService {
    constructor(
        private cepRepository: CepApiRepository
    ) {}

    async findCep(cep: string): Promise<any> {
        return await this.cepRepository.findCep(cep);
    }
}
