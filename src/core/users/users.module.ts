import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { QueuesConst } from '@/queue/data';

import { CodeSession, CodeSessionSchema } from './model/code-session.model';
import { UsersService } from './users.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: QueuesConst.SEND_USER_CODE,
    }),
    MongooseModule.forFeature([
      { name: CodeSession.name, schema: CodeSessionSchema },
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
