import { Module } from '@nestjs/common';
import { RootModule } from './root/root.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { Encryt } from './commons/encryt';
import { PoepleModule } from './poeple/poeple.module';
import { AddressModule } from './address/address.module';
import { CepModule } from './cep/cep.module';
import { HttpClientProvider } from './commons/http/http-client.provider';
import axiosProvider from './commons/axios-provider';
import axios from 'axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    JwtModule.register({
      global: true,
      secret: configuration().secret,
      signOptions: { expiresIn: '60m' },
    }),
    RootModule,
    UserModule,
    AuthModule,
    PoepleModule,
    AddressModule,
    CepModule
  ],
  controllers: [],
  providers: [
    Encryt, 
    {
      provide: 'AXIOS_PROVIDER',
      useFactory: () => {
          return axiosProvider;
      },
    },
  ],
})
export class AppModule {}
