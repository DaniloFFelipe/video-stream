import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CodeModel {
  @Field()
  authToken: string;
}
