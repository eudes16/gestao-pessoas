import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginOutputDto } from './ports/login-output.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthInputDto } from './ports/auth-input.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: AuthInputDto): Promise<LoginOutputDto> {
        return await this.authService.login(dto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    profile(@Request() req) {
        return req.user;
    }
}
