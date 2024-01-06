import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { VideoService } from '@/core/video/video.service';

import { Queues, QueuesConst } from '../data';

@Processor(QueuesConst.VIDEO_CONVERT_DONE)
export class VideoConsumer {
  constructor(private service: VideoService) {}

  @Process()
  async done(job: Job<Queues.VideoConvertDoneQueue>) {
    const videoId = job.data.file.fileId;
    const streamPath = job.data.convert.path;
    await this.service.done(videoId, streamPath);
  }
}
