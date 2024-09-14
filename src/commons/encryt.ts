var CryptoJS = require('crypto-js');
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Encryt {
    constructor(
        private configService: ConfigService
    ) {}

    passwordEncode(password: string): string {
        const secret = this.configService.get('secret');
        return CryptoJS.MD5(password + secret).toString();
    }

}
