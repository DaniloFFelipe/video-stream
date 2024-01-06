import { envSchema } from './schema';

const environment = envSchema.parse(process.env);

export const Env = environment;
