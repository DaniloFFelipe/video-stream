import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';

import { QueuesConst } from '@/queue/data';

import { HLSVideoProcessorService } from './hls/hls-video-processor.service';
import { VideoProcessorService } from './video-processor.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: QueuesConst.VIDEO_CONVERT,
    }),
    BullModule.registerQueue({
      name: QueuesConst.VIDEO_CONVERT_DONE,
    }),
  ],
  providers: [
    {
      provide: VideoProcessorService,
      useClass: HLSVideoProcessorService,
    },
  ],
  exports: [VideoProcessorService],
})
export class VideoProcessorModule {}
