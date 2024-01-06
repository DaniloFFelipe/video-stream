import { Global, Module } from '@nestjs/common';

import { FakeMailService } from './fake/fake-mail.service';
import { MailService } from './mail.service';

@Global()
@Module({
  providers: [
    {
      useClass: FakeMailService,
      provide: MailService,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
