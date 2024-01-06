import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { Env } from '@/env';

import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: Env.JWT_SECRET,
      signOptions: { expiresIn: '60d' },
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
