import type z from 'zod';
import type { GenderEnum } from './enums';

export type GenderLabel = 'DER' | 'DIE' | 'DAS' | '?';

export type Gender = z.infer<typeof GenderEnum>;
