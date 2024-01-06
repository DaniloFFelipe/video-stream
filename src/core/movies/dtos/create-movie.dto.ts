import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  synopsis: z.string(),
  posterPath: z.string(),
  coverPath: z.string(),
  contentId: z.string(),
  metadata: z.object({
    lengthInSeconds: z.number(),
  }),
});

export class CreateMovieDto extends createZodDto(schema) {}

@InputType()
export class CreateMovieInput {
  @Field()
  title: string;

  @Field()
  synopsis: string;

  @Field()
  posterPath: string;

  @Field()
  coverPath: string;

  @Field()
  contentId: string;

  @Field()
  contentLengthInSeconds: number;
}
