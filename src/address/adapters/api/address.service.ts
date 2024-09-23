import { Inject, Injectable } from '@nestjs/common';
import { Service } from 'src/commons/service.interface';
import { AddressDbRepository } from '../db/address-db.repository';
import { AddressFindUseCase } from 'src/address/domain/usecases/address-find.usecases';
import responseProvider from 'src/commons/response/response.provider';
import { AddressFindDto } from './port/address-find.dto';
import { AddressCreateUseCase } from 'src/address/domain/usecases/address-create.usecases';
import { AddressUpdateUsecase } from 'src/address/domain/usecases/address.-update.usecase';
import { AddressDeleteUsecase } from 'src/address/domain/usecases/addrss-delete.usecase';

@Injectable()
export class AddressService implements Service {
    constructor (
        @Inject('AddressRepository')
        private repository: AddressDbRepository
    ) {}

    async find(dto: AddressFindDto): Promise<any> {
        const { page, limit } = dto
        const useCase = new AddressFindUseCase(this.repository);

        const addressFindInput: any = dto
        const records: any = await useCase.execute(addressFindInput);

        const count = await this.repository.count(addressFindInput);

        return responseProvider(records, count, limit, page)
    }

    async create(data: any): Promise<any> {
        const useCase = new AddressCreateUseCase(this.repository);
        return await useCase.execute(data);
    }

    async update(id: number, data: any): Promise<any> {
        const useCase = new AddressUpdateUsecase(this.repository);
        return await useCase.execute({ ...data, id: id });
    }

    async delete(id: number): Promise<any> {
        const useCase = new AddressDeleteUsecase(this.repository);
        return await useCase.execute({ id });
    }

}