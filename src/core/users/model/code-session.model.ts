import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class CodeSession {
  @Prop()
  token: string;

  @Prop()
  userId: string;

  @Prop()
  userEmail: string;

  @Prop()
  code: string;

  @Prop()
  exp: number;
}

export type CodeSessionDocument = HydratedDocument<CodeSession>;
export const CodeSessionSchema = SchemaFactory.createForClass(CodeSession);
