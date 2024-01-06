import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { MailService } from '@/mail/mail.service';

import { Queues, QueuesConst } from '../data';

@Processor(QueuesConst.SEND_USER_CODE)
export class SendUserCodeConsumer {
  constructor(private mail: MailService) {}

  @Process()
  async done(job: Job<Queues.SendUserCodeQueue>) {
    const content = job.data;
    await this.mail.sendAuthCode(content);
  }
}
