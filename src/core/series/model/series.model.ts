import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SeriesModel {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  synopsis: string;

  @Field()
  posterPath: string;

  @Field()
  coverPath: string;
}

@ObjectType()
export class FeaturedSeriesModel {
  @Field(() => SeriesModel, { nullable: true })
  mainSeries: SeriesModel;

  @Field(() => [SeriesModel])
  series: SeriesModel[];
}
