import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RedisModule } from '@nestjs-modules/ioredis';

import { Env } from '@/env';

import { PrismaService } from './prisma/prisma.service';

const mongoDns = Env.MONGO_URL;

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(mongoDns),
    RedisModule.forRoot({
      type: 'single',
      url: 'redis://localhost:6379',
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
