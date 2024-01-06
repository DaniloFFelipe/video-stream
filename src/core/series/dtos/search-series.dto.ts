import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

import { pageSchema } from '@/shared/types/pagination';

const schema = z
  .object({
    q: z.string().optional(),
  })
  .merge(pageSchema);

export class SearchSeriesDto extends createZodDto(schema) {}

@InputType()
export class SearchSeriesInput {
  @Field({ nullable: true })
  page: number;

  @Field({ nullable: true })
  perPage: number;

  @Field({ nullable: true })
  q: string;
}
