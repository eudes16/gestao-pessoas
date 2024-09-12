import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class RootController {
    @Get()
    getRoot() {
        const APP_VERSION = require('../../package.json').version;
        const APP_NAME = require('../../package.json').name;
        return {
            name: APP_NAME,
            version: APP_VERSION,
        };
    }
}
