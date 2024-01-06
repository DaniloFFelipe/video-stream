import { Connection } from 'mongoose';

import { VideoSchema } from '@/core/video/model/video.model';

import { MongoData } from '../data';

export const VideoProvider = {
  provide: MongoData.VIDEO_MODEL,
  useFactory: (connection: Connection) =>
    connection.model('Video', VideoSchema),
  inject: [MongoData.PROVIDER],
};
