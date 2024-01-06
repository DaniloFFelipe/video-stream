import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContentModel {
  @Field()
  _id: string;
  @Field()
  name: string;
  @Field()
  originalPath: string;
  @Field()
  status: string;
  @Field()
  streamPath: string;
}
