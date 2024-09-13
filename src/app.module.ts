import { Module } from '@nestjs/common';
import { RootModule } from './root/root.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    RootModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
