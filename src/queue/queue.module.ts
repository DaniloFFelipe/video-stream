import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { Env } from '@/env';

import { SendUserCodeConsumer } from './consumers/send-user-code.consumer';
import { VideoConsumer } from './consumers/video.consumer';
import { VideoProcessorConsumer } from './consumers/video-processor.consumer';
import { QueuesConst } from './data';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: QueuesConst.SEND_USER_CODE,
    }),
    BullModule.registerQueue({
      name: QueuesConst.VIDEO_CONVERT,
    }),
    BullModule.registerQueue({
      name: QueuesConst.VIDEO_CONVERT_DONE,
    }),
    BullModule.forRoot({
      redis: {
        host: Env.REDIS_HOST,
        port: Env.REDIS_PORT,
      },
    }),
  ],
  providers: [VideoProcessorConsumer, VideoConsumer, SendUserCodeConsumer],
  exports: [VideoProcessorConsumer, VideoConsumer, SendUserCodeConsumer],
})
export class QueueModule {}
