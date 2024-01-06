import { Injectable } from '@nestjs/common';

import { MailService } from '../mail.service';

@Injectable()
export class FakeMailService implements MailService {
  async sendAuthCode(content: { code: string; email: string }): Promise<void> {
    console.log(content);
  }
}
