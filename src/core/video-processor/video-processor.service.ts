import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class VideoProcessorService {
  abstract convert(
    originalPath: string,
    fileName: string,
  ): Promise<{ path: string }>;
}
