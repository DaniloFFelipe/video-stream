import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { Public } from '@/auth/public';
import { CreateMovieDto } from '@/core/movies/dtos/create-movie.dto';
import { SearchMoviesDto } from '@/core/movies/dtos/search-movies.dto';
import { MoviesService } from '@/core/movies/movies.service';
import { ContentService } from '@/core/video/content.service';

@Controller('movies')
export class MovieController {
  constructor(
    private moviesService: MoviesService,
    private contentService: ContentService,
  ) {}

  @Public()
  @Get('/featured')
  async featured() {
    const movies = await this.moviesService.featured();
    return movies;
  }

  @Post()
  async create(@Body() data: CreateMovieDto) {
    await this.moviesService.create(data);
  }

  @Get('/search')
  @Public()
  async search(@Param() data: SearchMoviesDto) {
    const movies = await this.moviesService.search(data);
    return movies;
  }

  @Get('/:id')
  async byId(@Param('id') id: string) {
    const movie = await this.moviesService.findById(id);
    if (!movie) throw new BadRequestException('Invalid movie id');

    const content = await this.contentService.findById(movie.contentId);

    return {
      movie: {
        ...movie,
        contentId: undefined,
        content,
      },
    };
  }
}
