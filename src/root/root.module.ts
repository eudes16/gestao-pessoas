import { Module } from '@nestjs/common';
import { RootController } from './root.controller';

@Module({
    imports: [
        RootModule,
    ],
    controllers: [
        RootController,
    ],
})
export class RootModule {}
