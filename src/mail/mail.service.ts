import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class MailService {
  abstract sendAuthCode(content: {
    code: string;
    email: string;
  }): Promise<void>;
}
