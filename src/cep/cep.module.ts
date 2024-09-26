import { Module } from '@nestjs/common';
import cepHttpClientProvider from './adapters/providers/cep-http-client.provider';
import { CepController } from './adapters/api/cep.controller';
import { CepService } from './adapters/api/cep.service';
import { CepApiRepository } from './adapters/cep-api.repository';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
    providers: [
        ConfigService,
        JwtService,
        CepService,
        CepApiRepository,
        {
            provide: 'CEP_HTTP_CLIENT_PROVIDER',
            useFactory: cepHttpClientProvider
        },
    ],
    controllers: [CepController],
})
export class CepModule {}
