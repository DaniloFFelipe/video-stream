import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  token: z.string().uuid(),
  code: z.string().length(6),
});

export class LoginDto extends createZodDto(schema) {}

@InputType()
export class LoginInput {
  @Field()
  token: string;

  @Field()
  code: string;
}
