import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { FindUserByMailDto } from './ports/find-user-by-email.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @HttpCode(HttpStatus.OK)
    @Post("email")
    async findUserByMail(@Body() dto: FindUserByMailDto) {
        
        if (!dto.email) {
            throw new HttpException("Email is required", HttpStatus.BAD_REQUEST);
        }

        const result = await this.userService.findUserByMail(dto);

        if (!result) {
            throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        
        return result;
    }
}
