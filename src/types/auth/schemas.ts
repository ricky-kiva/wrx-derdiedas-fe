import z from 'zod';
import { ResponseStatusEnum } from '../shared/enums';
import { UserSchema } from '../user/schema';

export const LoginPayloadSchema = z.object({
  googleIdToken: z.string().min(1, "googleIdToken is required")
});

export const LoginResDataSchema = z.object({
  accessToken: z.string(),
  user: UserSchema
});

export const LoginResSchema = z.object({
  status: ResponseStatusEnum,
  data: LoginResDataSchema
});

export const RefreshTokenResDataSchema = z.object({
  accessToken: z.string()
});

export const RefreshTokenResSchema = z.object({
  status: ResponseStatusEnum,
  data: RefreshTokenResDataSchema
});

export const LogoutPayloadSchema = z.object({
  id: z.string().min(1, "id of user is required")
});
