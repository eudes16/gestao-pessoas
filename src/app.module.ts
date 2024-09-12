import { Module } from '@nestjs/common';
import { RootController } from './root/root.controller';

@Module({
  imports: [],
  controllers: [RootController],
  providers: [],
})
export class AppModule {}
