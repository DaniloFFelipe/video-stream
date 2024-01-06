import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string(),
  MONGO_URL: z.string(),
  JWT_SECRET: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.coerce.number(),
  PORT: z.coerce.number().default(3333),
});
