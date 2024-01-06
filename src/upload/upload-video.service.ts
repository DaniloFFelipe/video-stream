import { Injectable, StreamableFile } from '@nestjs/common';

@Injectable()
export abstract class UploadVideoService {
  abstract upload(file: Express.Multer.File): Promise<string>;
  abstract find(path: string): Promise<StreamableFile>;
}
