import { BadRequestException } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { isGQl, Public } from '@/auth/public';
import { CreateMovieInput } from '@/core/movies/dtos/create-movie.dto';
import { SearchMoviesInput } from '@/core/movies/dtos/search-movies.dto';
import {
  FeaturedMovieModel,
  MovieModel,
} from '@/core/movies/model/movie.model';
import { MoviesService } from '@/core/movies/movies.service';
import { ContentService } from '@/core/video/content.service';

@Resolver(() => MovieModel)
export class MovieResolver {
  constructor(
    private moviesService: MoviesService,
    private contentService: ContentService,
  ) {}

  @Mutation(() => MovieModel, {
    name: 'movie',
  })
  @isGQl()
  async create(@Args('data') data: CreateMovieInput) {
    const movie = await this.moviesService.create({
      coverPath: data.coverPath,
      posterPath: data.posterPath,
      synopsis: data.synopsis,
      title: data.title,
      contentId: data.contentId,
      metadata: {
        lengthInSeconds: data.contentLengthInSeconds,
      },
    });
    return movie;
  }

  @Query(() => [MovieModel])
  @Public()
  @isGQl()
  async search(@Args('params') data: SearchMoviesInput) {
    const movies = await this.moviesService.search({
      page: data.page,
      per_page: data.perPage,
      q: data.q,
    });

    return movies.data;
  }

  @isGQl()
  @Query(() => MovieModel, {
    name: 'movie',
  })
  async byId(@Args('id') id: string) {
    const movie = await this.moviesService.findById(id);
    if (!movie) throw new BadRequestException('Invalid movie id');

    return movie;
  }

  @Query(() => FeaturedMovieModel)
  @Public()
  @isGQl()
  async featured() {
    const movies = await this.moviesService.featured();
    return movies;
  }

  @ResolveField()
  async content(@Parent() movie: MovieModel) {
    const content = await this.contentService.findById(movie.contentId);
    return content;
  }
}
