import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UserLoginRequestDto, UserLoginResponseDto } from './user.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  @Post('login')
  login(@Body() payload: UserLoginRequestDto): UserLoginResponseDto {
    return {
      token: 'token',
    };
  }
}
