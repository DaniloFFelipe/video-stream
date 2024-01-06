import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  title: z.string(),
  synopsis: z.string(),
  posterPath: z.string(),
  coverPath: z.string(),
});

export class CreateSeriesDto extends createZodDto(schema) {}

@InputType()
export class CreateSeriesInput {
  @Field()
  title: string;

  @Field()
  synopsis: string;

  @Field()
  posterPath: string;

  @Field()
  coverPath: string;
}
