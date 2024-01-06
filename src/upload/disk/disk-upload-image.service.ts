import { UploadImageService } from '../upload-image.service';
import { promisify } from 'node:util';
import { createReadStream, rename as renameFs } from 'node:fs';
import { join } from 'node:path';
import {
  BadRequestException,
  Injectable,
  StreamableFile,
} from '@nestjs/common';

const rename = promisify(renameFs);

@Injectable()
export class DiskUploadImageService implements UploadImageService {
  pathTo = 'upload/image';

  async upload(file: Express.Multer.File): Promise<string> {
    const newFileName = `${file.filename}.${file.originalname.split('.')[1]}`;
    await rename(
      join(process.cwd(), 'upload/temp', file.filename),
      join(process.cwd(), this.pathTo, newFileName),
    );

    const url = `images/${newFileName}`;
    return url;
  }

  async find(path: string) {
    try {
      const file = createReadStream(join(process.cwd(), this.pathTo, path));
      return new StreamableFile(file);
    } catch {
      throw new BadRequestException();
    }
  }
}
