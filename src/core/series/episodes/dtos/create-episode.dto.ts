import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  synopsis: z.string(),
  coverPath: z.string(),
  contentId: z.string(),
  seriesId: z.string(),
  metadata: z.object({
    lengthInSeconds: z.number(),
  }),
});

export class CreateEpisodeDto extends createZodDto(schema) {}

@InputType()
export class CreateEpisodeInput {
  @Field()
  title: string;

  @Field()
  synopsis: string;

  @Field()
  coverPath: string;

  @Field()
  contentId: string;

  @Field()
  seriesId: string;

  @Field()
  contentLengthInSeconds: number;
}
