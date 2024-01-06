import { Field, ObjectType } from '@nestjs/graphql';

import { Metadata } from '@/core/shared/metadata';
import { ContentModel } from '@/core/video/model/content.model';

@ObjectType()
export class MovieModel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  synopsis: string;

  @Field()
  posterPath: string;

  @Field()
  coverPath: string;

  contentId: string;

  @Field(() => ContentModel)
  content: ContentModel;

  // @Field(() => Metadata)
  metadata: Metadata;
}

@ObjectType()
export class FeaturedMovieModel {
  @Field(() => MovieModel, { nullable: true })
  mainMovie: MovieModel;

  @Field(() => [MovieModel])
  movies: MovieModel[];
}
