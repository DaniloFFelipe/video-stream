import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { Public } from '@/auth/public';
import { CreateSeriesDto } from '@/core/series/dtos/create-series.dto';
import { SearchSeriesDto } from '@/core/series/dtos/search-series.dto';
import { SeriesService } from '@/core/series/series.service';

@Controller('series')
export class SerieController {
  constructor(private seriesService: SeriesService) {}

  @Post()
  async create(@Body() data: CreateSeriesDto) {
    await this.seriesService.create(data);
  }

  @Public()
  @Get('/search')
  async search(@Param() data: SearchSeriesDto) {
    const series = await this.seriesService.search(data);
    return series;
  }

  @Public()
  @Get('/featured')
  async featured() {
    const series = await this.seriesService.featured();
    return series;
  }

  @Get('/:id')
  async byId(@Param('id') id: string) {
    const series = await this.seriesService.findById(id, true);
    if (!series) throw new BadRequestException('Invalid serie id');

    return {
      series,
    };
  }
}
