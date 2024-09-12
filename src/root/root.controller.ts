import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class RootController {
    @Get()
    getRoot() {
        const APP_VERSION = require('../../package.json').version;
        return {
            name: 'Gestão de Pessoas',
            version: APP_VERSION,
        };
    }
}
