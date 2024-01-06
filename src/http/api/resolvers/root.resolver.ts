import { Query, Resolver } from '@nestjs/graphql';

import { isGQl } from '@/auth/public';

@Resolver()
export class RootResolver {
  @Query(() => String)
  @isGQl()
  running() {
    return 'Server is runnnig ';
  }
}
