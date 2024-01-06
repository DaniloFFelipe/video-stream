import { BullModule } from '@nestjs/bull';
import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { UploadModule } from 'src/upload/upload.module';

import { QueuesConst } from '@/queue/data';

import { ContentService } from './content.service';
import { Video, VideoSchema } from './model/video.model';
import { VideoService } from './video.service';

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
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    UploadModule,
  ],
  providers: [VideoService, ContentService],
  exports: [VideoService, ContentService],
})
export class VideoModule {}
