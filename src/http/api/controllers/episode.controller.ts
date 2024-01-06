import { Body, Controller, Post } from '@nestjs/common';

import { CreateEpisodeDto } from '@/core/series/episodes/dtos/create-episode.dto';
import { EpisodesService } from '@/core/series/episodes/episodes.service';

@Controller('episodes')
export class EpisodeController {
  constructor(private episodesService: EpisodesService) {}

  @Post('/')
  async create(@Body() data: CreateEpisodeDto) {
    await this.episodesService.create(data);
  }
}
