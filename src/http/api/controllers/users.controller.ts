import { Body, Controller, Post } from '@nestjs/common';

import { Public } from '@/auth/public';
import { LoginDto } from '@/core/users/dto/login.dto';
import { RequestCodeDto } from '@/core/users/dto/request-code.dto';
import { ResendDto } from '@/core/users/dto/resend.dto';
import { SignUpDto } from '@/core/users/dto/signup.dto';
import { UsersService } from '@/core/users/users.service';

@Controller('users')
export class UserController {
  constructor(private service: UsersService) {}

  @Public()
  @Post('register')
  async signUp(@Body() data: SignUpDto) {
    await this.service.signUp(data);
  }

  @Public()
  @Post('auth')
  async login(@Body() data: LoginDto) {
    return this.service.login(data);
  }

  @Public()
  @Post('code')
  async code(@Body() data: RequestCodeDto) {
    return this.service.requestCode(data);
  }

  @Public()
  @Post('resend')
  async resend(@Body() data: ResendDto) {
    return this.service.resend(data);
  }
}
