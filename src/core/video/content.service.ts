import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Video } from './model/video.model';

@Injectable()
export class ContentService {
  constructor(
    @InjectModel(Video.name)
    private video: Model<Video>,
  ) {}

  async findById(id: string) {
    return await this.video.findById(id);
  }
}
