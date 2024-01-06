import * as mongoose from 'mongoose';

import { MongoData } from '../data';

export const MongoProvider = {
  provide: MongoData.PROVIDER,
  useFactory: (): Promise<typeof mongoose> =>
    mongoose.connect('mongodb://localhost/nest'),
};
