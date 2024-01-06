import { Args, Query, Resolver } from '@nestjs/graphql';

import { isGQl } from '@/auth/public';
import { ContentService } from '@/core/video/content.service';
import { ContentModel } from '@/core/video/model/content.model';

@Resolver(() => ContentModel)
export class ContentResolver {
  constructor(private service: ContentService) {}

  @isGQl()
  @Query(() => ContentModel)
  content(@Args('id') id: string) {
    return this.service.findById(id);
  }
}
