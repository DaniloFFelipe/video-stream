import { Global, Module } from '@nestjs/common';

import { MoviesService } from './movies.service';

@Global()
@Module({
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
