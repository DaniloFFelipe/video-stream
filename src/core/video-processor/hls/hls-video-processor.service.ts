import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { Injectable } from '@nestjs/common';
import * as Ffmpeg from 'fluent-ffmpeg';

import { VideoProcessorService } from '../video-processor.service';

@Injectable()
export class HLSVideoProcessorService implements VideoProcessorService {
  private pathStream = 'upload/stream';

  async convert(originalPath: string, fileName: string) {
    await mkdir(join(process.cwd(), this.pathStream, fileName));

    const path = join(process.cwd(), this.pathStream, fileName, 'output.m3u8');
    await this._generateHLS(join(process.cwd(), originalPath), path);

    const finalPath = join(this.pathStream, fileName, 'output.m3u8');
    return {
      path: finalPath,
    };
  }

  private async _generateHLS(
    originalPath: string,
    finalPath: string,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      Ffmpeg(originalPath, { timeout: 432000 })
        .addOptions([
          '-profile:v baseline',
          '-level 3.0',
          '-s 640x360',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output(finalPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
  }
}
