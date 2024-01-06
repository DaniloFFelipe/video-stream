import {
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { VideoService } from '@/core/video/video.service';
import { Pagination } from '@/shared/types/pagination';

@Controller('videos')
export class VideoController {
  constructor(private service: VideoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async save(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(mp4)$/,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.service.insert(file);
  }

  @Get('/')
  async list(@Query() pagination: Pagination) {
    return this.service.list(pagination);
  }
}
