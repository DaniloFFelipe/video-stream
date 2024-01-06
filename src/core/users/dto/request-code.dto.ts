import { Field, InputType } from '@nestjs/graphql';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
});

export class RequestCodeDto extends createZodDto(schema) {}

@InputType()
export class RequestCodeInput {
  @Field()
  email: string;
}
