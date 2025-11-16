import type z from 'zod';
import type { LoginPayloadSchema, LogoutPayloadSchema } from './schemas';
import type { User } from '../user/types';

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type LogoutPayload = z.infer<typeof LogoutPayloadSchema>;

export interface LoginData {
  accessToken: string;
  user: User;
}

export interface RefreshTokenData {
  accessToken: string;
}
