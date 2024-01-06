import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const pageSchema = z.object({
  page: z.coerce.number().optional().default(1),
  per_page: z.coerce.number().optional().default(10),
});

export class Pagination extends createZodDto(pageSchema) {}

type PaginationResultMeta = {
  total: number;
  page: number;
  per_page: number;
};

export class PaginationResult<T> {
  meta: PaginationResultMeta;
  data: T[];

  constructor(meta: PaginationResultMeta, data: T[]) {
    this.data = data;
    this.meta = meta;
  }
}
