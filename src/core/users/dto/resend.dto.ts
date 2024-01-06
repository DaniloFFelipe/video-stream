import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  token: z.string().uuid(),
});

export class ResendDto extends createZodDto(schema) {}

@InputType()
export class ResendInput {
  @Field()
  token: string;
}
