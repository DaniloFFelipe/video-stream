import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserModel {
  @Field()
  profilePath: string;

  @Field()
  email: string;

  @Field()
  name: string;
}

@ObjectType()
export class SessionModel {
  @Field(() => UserModel)
  user: UserModel;

  @Field()
  token: string;
}
