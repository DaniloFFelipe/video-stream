import { Field, InputType, ObjectType } from '@nestjs/graphql';

ObjectType();
export class Metadata {
  @Field()
  lengthInSeconds: number;
}

InputType();
export class MetadataInput {
  @Field()
  lengthInSeconds: number;
}
