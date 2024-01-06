import { randomUUID } from 'node:crypto';

import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma/prisma.service';

import { ContentService } from '../video/content.service';
import { CreateSeriesDto } from './dtos/create-series.dto';
import { SearchSeriesDto } from './dtos/search-series.dto';

@Injectable()
export class SeriesService {
  constructor(
    private prisma: PrismaService,
    private content: ContentService,
  ) {}

  async create({ ...data }: CreateSeriesDto) {
    const seriesId = randomUUID();

    return await this.prisma.serie.create({
      data: {
        id: seriesId,
        ...data,
      },
    });
  }

  async findById(id: string, episodes: boolean = false) {
    const data = await this.prisma.serie.findUnique({
      where: { id },
      include: {
        episodes,
      },
    });

    if (!data) throw new BadRequestException('Invalid id');

    const ep = (
      await Promise.all(
        data.episodes.map((e) => this.content.findById(e.contentId)),
      )
    ).map((content, i) => ({
      ...data.episodes[i],
      content,
    }));

    return {
      ...data,
      episodes: ep,
    };
  }

  async search({ page = 1, per_page = 20, q }: SearchSeriesDto) {
    const take = Number(per_page);
    const skip = (page - 1) * take;

    const [total, data] = await Promise.all([
      this.prisma.serie.count({
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
      this.prisma.serie.findMany({
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
    const allSeriess = await this.prisma.serie.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (allSeriess.length === 0) {
      return {
        mainSeries: null,
        seriess: [],
      };
    }

    if (allSeriess.length === 1) {
      const [mainSeries] = allSeriess;
      return {
        mainSeries,
        seriess: [],
      };
    }

    const [mainSeries, ...seriess] = allSeriess;
    return {
      mainSeries,
      seriess,
    };
  }
}
