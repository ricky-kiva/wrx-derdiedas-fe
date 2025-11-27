import type z from 'zod';
import type { UpdateUserPayloadSchema } from './schemas';

export type UpdateUserPayload = z.infer<typeof UpdateUserPayloadSchema>

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserPointData {
  point: number;
}

export interface UpdateUserData {
  id: string;
  name: string;
  picture?: string;
}
