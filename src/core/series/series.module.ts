import { Global, Module } from '@nestjs/common';

import { EpisodesService } from './episodes/episodes.service';
import { SeriesService } from './series.service';

@Global()
@Module({
  providers: [SeriesService, EpisodesService],
  exports: [SeriesService, EpisodesService],
})
export class SeriesModule {}
