import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Video {
  @Prop()
  name: string;

  @Prop()
  streamPath?: string;

  @Prop()
  originalPath: string;

  @Prop()
  status: string;

  @Prop()
  createdAt: Date;
}

export type VideoDocument = HydratedDocument<Video>;
export const VideoSchema = SchemaFactory.createForClass(Video);
