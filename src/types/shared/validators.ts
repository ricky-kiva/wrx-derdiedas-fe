import { ApiResponseSchema } from './schema';
import type { ApiResponse } from './types';

export const isApiResponse = (v: unknown): v is ApiResponse =>
  ApiResponseSchema.safeParse(v).success;
