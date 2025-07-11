import type z from 'zod';
import type { SearchNounResponseSchema } from './schemas';
import type { GenderEnum } from './enums';

export type GenderLabel = 'DER' | 'DIE' | 'DAS' | '?';

export type Gender = z.infer<typeof GenderEnum>;
export type SearchNounResponse = z.infer<typeof SearchNounResponseSchema>;
