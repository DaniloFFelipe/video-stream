import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

import { Public } from '@/auth/public';
import { UploadImageService } from '@/upload/upload-image.service';
import { UploadVideoService } from '@/upload/upload-video.service';

// import { Public } from 'src/auth/public';

@Controller('')
export class UploadController {
  constructor(
    private service: UploadVideoService,
    private imgService: UploadImageService,
  ) {}

  @Public()
  @Get('images/:path')
  getImage(@Param('path') path: string) {
    return this.imgService.find(path);
  }

  @Post('upload/images')
  // @Public()
  @UseInterceptors(FileInterceptor('file'))
  async saveImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpeg|png|jpg)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1000 * 50,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const contentUrl = await this.imgService.upload(file);

    const url = `${req.protocol}://${req.hostname}${
      req.hostname === 'localhost' ? `:3000` : ''
    }/${contentUrl}`;

    return { url };
  }

  @Get('content/*')
  getContent(@Req() req: Request) {
    const url = `${req.url.split('content/')[1]}`;
    return this.service.find(url);
  }
}
