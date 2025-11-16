import type z from 'zod';
import type { GenderEnum } from './enums';

export type ApiResponse<T=unknown> =
  | { status: 'success'; data: T; }
  | { status: 'fail' | 'error'; message: string; }

export type Gender = z.infer<typeof GenderEnum>

export type GenderLabel = 'DER' | 'DIE' | 'DAS' | '?';
