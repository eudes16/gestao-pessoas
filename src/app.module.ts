import { Module } from '@nestjs/common';
import { RootController } from './root/root.controller';
import { RootModule } from './root/root.module';

@Module({
  imports: [RootModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
