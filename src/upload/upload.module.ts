import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { QueuesConst } from '@/queue/data';

import { DiskUploadImageService } from './disk/disk-upload-image.service';
import { DiskUploadVideoService } from './disk/disk-upload-video.service';
import { UploadImageService } from './upload-image.service';
import { UploadVideoService } from './upload-video.service';

@Global()
@Module({
  imports: [
    BullModule.registerQueue({
      name: QueuesConst.VIDEO_CONVERT,
    }),
    BullModule.registerQueue({
      name: QueuesConst.VIDEO_CONVERT_DONE,
    }),
    MulterModule.register({
      dest: './upload/temp',
    }),
  ],
  providers: [
    {
      useClass: DiskUploadVideoService,
      provide: UploadVideoService,
    },
    {
      useClass: DiskUploadImageService,
      provide: UploadImageService,
    },
  ],
  exports: [UploadVideoService, UploadImageService],
})
export class UploadModule {}
