import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';

import { Queues, QueuesConst } from '@/queue/data';
import { Pagination, PaginationResult } from '@/shared/types/pagination';
import { UploadVideoService } from '@/upload/upload-video.service';

import { Video } from './model/video.model';

@Injectable()
export class VideoService {
  constructor(
    @InjectQueue(QueuesConst.VIDEO_CONVERT)
    private videoConvertMQ: Queue<Queues.VideoConvertQueue>,
    @InjectModel(Video.name)
    private video: Model<Video>,
    private uploadService: UploadVideoService,
  ) {}

  async insert(file: Express.Multer.File) {
    const fileName = file.filename;
    const url = await this.uploadService.upload(file);

    const video = new this.video({
      name: fileName,
      originalPath: url,
    });

    await video.save();

    await this.videoConvertMQ.add({
      fileId: video._id.toString(),
      fileName,
      originalPath: url,
    });

    return { video };
  }

  async list({ page, per_page }: Pagination) {
    const offset = (page - 1) * per_page;
    const limit = per_page;

    const [total, data] = await Promise.all([
      this.video.countDocuments(),
      this.video.find({}, undefined, { skip: offset, limit }),
    ]);

    return new PaginationResult(
      {
        page,
        per_page,
        total,
      },
      data,
    );
  }

  async done(id: string, streamPath: string) {
    return await this.video.updateOne(
      { _id: id },
      {
        streamPath,
        status: 2,
      },
    );
  }
}
