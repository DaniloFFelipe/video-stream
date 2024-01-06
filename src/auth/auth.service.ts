import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Env } from '@/env';

import { AuthPayload } from './auth.payload';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async sign({ sub }: AuthPayload, exp: string = '60d') {
    return this.jwtService.signAsync(
      {
        sub,
      },
      {
        secret: Env.JWT_SECRET,
        expiresIn: exp,
      },
    );
  }

  async verify(token: string) {
    return this.jwtService.verify(token, { secret: Env.JWT_SECRET });
  }
}
