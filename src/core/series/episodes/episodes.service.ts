import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma/prisma.service';

import { CreateEpisodeDto } from './dtos/create-episode.dto';

@Injectable()
export class EpisodesService {
  constructor(private prisma: PrismaService) {}

  async create({
    metadata,
    contentId,
    seriesId,
    synopsis,
    title,
    coverPath,
  }: CreateEpisodeDto) {
    const id = randomUUID();

    return await this.prisma.episode.create({
      data: {
        id,
        metadata,
        contentId,
        coverPath,
        serieId: seriesId,
        synopsis,
        title,
      },
    });
  }

  async findManyBySeriesId(serieId: string) {
    return this.prisma.episode.findMany({
      where: {
        serieId,
      },
    });
  }
}
