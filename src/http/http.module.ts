import { join } from 'node:path';

import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { MulterModule } from '@nestjs/platform-express';
import { ZodValidationPipe } from 'nestjs-zod';

import { AuthGuard } from '@/auth/auth.guard';

import { EpisodeController } from './api/controllers/episode.controller';
import { MovieController } from './api/controllers/movie.controller';
import { SerieController } from './api/controllers/series.controller';
import { UploadController } from './api/controllers/upload.controller';
import { UserController } from './api/controllers/users.controller';
import { VideoController } from './api/controllers/video.controller';
import { ContentResolver } from './api/resolvers/content.resolver';
import { MovieResolver } from './api/resolvers/movies.resolver';
import { RootResolver } from './api/resolvers/root.resolver';
import { UsersResolver } from './api/resolvers/users.resolver';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/http/api/schema.gql'),
    }),
    MulterModule.register({
      dest: './upload/temp',
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    MovieResolver,
    RootResolver,
    ContentResolver,
    UsersResolver,
  ],
  controllers: [
    UploadController,
    VideoController,
    MovieController,
    SerieController,
    UserController,
    EpisodeController,
  ],
})
export class HttpModule {}
