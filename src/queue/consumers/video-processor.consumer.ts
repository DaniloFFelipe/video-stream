import { InjectQueue, Process, Processor } from '@nestjs/bull';
import { Job, Queue } from 'bull';

import { VideoProcessorService } from '@/core/video-processor/video-processor.service';

import { Queues, QueuesConst } from '../data';

@Processor(QueuesConst.VIDEO_CONVERT)
export class VideoProcessorConsumer {
  constructor(
    private service: VideoProcessorService,

    @InjectQueue(QueuesConst.VIDEO_CONVERT_DONE)
    private videoConvertDoneMQ: Queue<Queues.VideoConvertDoneQueue>,
  ) {}

  @Process()
  async videoConvert(job: Job<Queues.VideoConvertQueue>) {
    const { path } = await this.service.convert(
      job.data.originalPath,
      job.data.fileName,
    );

    await this.videoConvertDoneMQ.add({
      convert: {
        path,
      },
      file: job.data,
    });
  }
}
