import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  profilePath: z.string(),
  name: z.string(),
});

export class SignUpDto extends createZodDto(schema) {}

InputType();
export class SignUpInput {
  @Field()
  email: string;

  @Field()
  profilePath: string;

  @Field()
  name: string;
}
