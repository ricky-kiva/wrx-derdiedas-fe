import type z from 'zod';
import type { SearchNounItemSchema, SearchNounResponseSchema } from './schemas';
import type { GenderEnum } from './enums';

export type GenderLabel = 'DER' | 'DIE' | 'DAS' | '?';

export type Gender = z.infer<typeof GenderEnum>;
export type SearchNounItem = z.infer<typeof SearchNounItemSchema>;
export type SearchNounResponse = z.infer<typeof SearchNounResponseSchema>;
