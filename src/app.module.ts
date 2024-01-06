import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './core/movies/movies.module';
import { SeriesModule } from './core/series/series.module';
import { UsersModule } from './core/users/users.module';
import { VideoModule } from './core/video/video.module';
import { VideoProcessorModule } from './core/video-processor/video-processor.module';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { MailModule } from './mail/mail.module';
import { QueueModule } from './queue/queue.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    QueueModule,
    UploadModule,
    VideoModule,
    VideoProcessorModule,
    HttpModule,
    MoviesModule,
    UsersModule,
    MailModule,
    SeriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
