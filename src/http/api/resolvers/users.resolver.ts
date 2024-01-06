import { Body } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { isGQl, Public } from '@/auth/public';
import { LoginInput } from '@/core/users/dto/login.dto';
import { RequestCodeInput } from '@/core/users/dto/request-code.dto';
import { ResendInput } from '@/core/users/dto/resend.dto';
import { SignUpInput } from '@/core/users/dto/signup.dto';
import { CodeModel } from '@/core/users/model/code.model';
import { SessionModel, UserModel } from '@/core/users/model/user.model';
import { UsersService } from '@/core/users/users.service';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private service: UsersService) {}

  // @isGQl()
  // @Mutation(() => String)
  // async register(@Args('data') data: SignUpInput) {
  //   await this.service.signUp(data);

  //   return 'Created';
  // }

  @isGQl()
  @Public()
  @Mutation(() => SessionModel)
  async login(@Args('data') data: LoginInput) {
    return this.service.login(data);
  }

  @isGQl()
  @Public()
  @Mutation(() => CodeModel)
  async code(@Args('data') data: RequestCodeInput) {
    return this.service.requestCode(data);
  }

  @isGQl()
  @Public()
  @Mutation(() => String)
  async resend(@Body() data: ResendInput) {
    await this.service.resend(data);
    return 'Ok';
  }
}
