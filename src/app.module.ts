import { Module } from '@nestjs/common';
import { RootModule } from './root/root.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';
import { JwtModule } from '@nestjs/jwt';
import { Encryt } from './commons/encryt';
import { PoepleModule } from './poeple/poeple.module';

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
    PoepleModule
  ],
  controllers: [],
  providers: [Encryt],
})
export class AppModule {}
