import type z from 'zod';
import type { SearchNounItemSchema, SearchNounResponseSchema } from './schemas';

export type SearchNounItem = z.infer<typeof SearchNounItemSchema>;
export type SearchNounResponse = z.infer<typeof SearchNounResponseSchema>;
