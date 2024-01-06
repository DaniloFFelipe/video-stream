import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma/prisma.service';

import { CreateMovieDto } from './dtos/create-movie.dto';
import { SearchMoviesDto } from './dtos/search-movies.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create({ metadata, ...data }: CreateMovieDto) {
    const movieId = randomUUID();

    return await this.prisma.movie.create({
      data: {
        id: movieId,
        ...data,
        metadata,
      },
    });
  }

  findById(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async search({ page = 1, per_page = 20, q }: SearchMoviesDto) {
    const take = Number(per_page);
    const skip = (page - 1) * take;

    const [total, data] = await Promise.all([
      this.prisma.movie.count({
        where: {
          OR: !!q
            ? [
                {
                  title: {
                    contains: q,
                    mode: 'insensitive',
                  },
                },
                {
                  synopsis: {
                    contains: q,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
        },
      }),
      this.prisma.movie.findMany({
        where: {
          OR: !!q
            ? [
                {
                  title: {
                    contains: q,
                    mode: 'insensitive',
                  },
                },
                {
                  synopsis: {
                    contains: q,
                    mode: 'insensitive',
                  },
                },
              ]
            : undefined,
        },
        take,
        skip,
      }),
    ]);

    return {
      meta: {
        total,
        page: Number(page),
        per_page: Number(per_page),
      },
      data,
    };
  }

  async featured() {
    const allMovies = await this.prisma.movie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (allMovies.length === 0) {
      return {
        mainMovie: null,
        movies: [],
      };
    }

    if (allMovies.length === 1) {
      const [mainMovie] = allMovies;
      return {
        mainMovie,
        movies: [],
      };
    }

    const [mainMovie, ...movies] = allMovies;
    return {
      mainMovie,
      movies,
    };
  }
}
