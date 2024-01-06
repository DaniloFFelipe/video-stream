import { randomUUID } from 'node:crypto';

import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { customAlphabet } from 'nanoid';

import { PrismaService } from '@/database/prisma/prisma.service';
import { Env } from '@/env';
import { Queues, QueuesConst } from '@/queue/data';

import { LoginDto } from './dto/login.dto';
import { RequestCodeDto } from './dto/request-code.dto';
import { ResendDto } from './dto/resend.dto';
import { SignUpDto } from './dto/signup.dto';
import { CodeSession } from './model/code-session.model';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @InjectModel(CodeSession.name)
    private codeSession: Model<CodeSession>,
    @InjectQueue(QueuesConst.SEND_USER_CODE)
    private sendUserCode: Queue<Queues.SendUserCodeQueue>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, name, profilePath }: SignUpDto) {
    const emailNotAvailable = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (emailNotAvailable) throw new BadRequestException('Email not available');

    return this.prisma.user.create({
      data: { id: randomUUID(), email, name, profilePath },
    });
  }

  async requestCode({ email }: RequestCodeDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new BadRequestException('Invalid credentials');
    const hasCode = await this.codeSession.findOne({
      userId: user.id,
    });

    if (hasCode) {
      await this.codeSession.deleteOne({
        _id: hasCode._id,
      });
    }

    const nanoid = customAlphabet('1234567890abcdef', 6);

    const code = nanoid();
    const token = randomUUID();
    const exp = dayjs().add(15, 'minute').toDate().getTime();

    await this.codeSession.create({
      code,
      token,
      userId: user.id,
      userEmail: user.email,
      exp,
    });

    await this.sendUserCode.add({
      code,
      email: user.email,
    });

    return {
      authToken: token,
    };
  }

  async resend({ token }: ResendDto) {
    const data = await this.codeSession.findOne({
      token,
    });
    if (!data) throw new UnauthorizedException('Invalid token');

    await this.sendUserCode.add({
      code: data.code,
      email: data.userEmail,
    });
  }

  async login({ code, token }: LoginDto) {
    const data = await this.codeSession.findOne({
      token,
    });
    if (!data) throw new UnauthorizedException('Invalid token');

    if (data.code.toLowerCase() !== code.toLowerCase()) {
      throw new UnauthorizedException('Invalid code');
    }

    if (data.exp < new Date().getTime()) {
      await this.codeSession.deleteOne({
        _id: data._id,
      });
      throw new UnauthorizedException('Code Expired');
    }

    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        id: data.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        profilePath: true,
      },
    });

    const jwt = await this.jwtService.signAsync(
      { sub: user.id },
      { secret: Env.JWT_SECRET },
    );

    await this.codeSession.deleteOne({
      _id: data._id,
    });

    return {
      user,
      token: jwt,
    };
  }
}
