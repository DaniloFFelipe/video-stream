import { createReadStream, rename as renameFs } from 'node:fs';
import { join } from 'node:path';
import { promisify } from 'node:util';

import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';

import { UploadVideoService } from '../upload-video.service';

const rename = promisify(renameFs);

@Injectable()
export class DiskUploadVideoService implements UploadVideoService {
  pathTo = 'upload/original';
  pathStream = 'upload/stream';

  async upload(file: Express.Multer.File): Promise<string> {
    const newFileName = `${file.filename}.${file.originalname.split('.')[1]}`;
    console.log(process.cwd(), 'upload/temp', file.filename);
    await rename(
      join(process.cwd(), 'upload/temp', file.filename),
      join(process.cwd(), this.pathTo, newFileName),
    );

    const url = `${this.pathTo}/${newFileName}`;

    return url;
  }

  async find(path: string) {
    try {
      const file = createReadStream(join(process.cwd(), path));
      return new StreamableFile(file);
    } catch {
      throw new BadRequestException();
    }
  }

  // async toHls(originalPath: string, fileName: string) {
  //   await mkdir(join(process.cwd(), this.pathStream, fileName));

  //   const path = join(process.cwd(), this.pathStream, fileName, 'output.m3u8');
  //   await this._generateHLS(join(process.cwd(), originalPath), path);

  //   return {
  //     path,
  //   };
  // }

  // private async _generateHLS(
  //   originalPath: string,
  //   finalPath: string,
  // ): Promise<void> {
  //   return new Promise((resolve, reject) => {
  //     Ffmpeg(originalPath, { timeout: 432000 })
  //       .addOptions([
  //         '-profile:v baseline',
  //         '-level 3.0',
  //         '-s 640x360',
  //         '-start_number 0',
  //         '-hls_time 10',
  //         '-hls_list_size 0',
  //         '-f hls',
  //       ])
  //       .output(finalPath)
  //       .on('end', resolve)
  //       .on('error', reject)
  //       .run();
  //   });
  // }
}
