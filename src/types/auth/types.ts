import type z from 'zod';
import type { LoginPayloadSchema, LoginResDataSchema, LoginResSchema, LogoutPayloadSchema, RefreshTokenResDataSchema, RefreshTokenResSchema } from './schemas';

export type LoginPayload = z.infer<typeof LoginPayloadSchema>;
export type LoginResponseData = z.infer<typeof LoginResDataSchema>;
export type LoginResponse = z.infer<typeof LoginResSchema>;
export type RefreshTokenResponseData = z.infer<typeof RefreshTokenResDataSchema>;
export type RefreshTokenResponse = z.infer<typeof RefreshTokenResSchema>;
export type LogoutPayload = z.infer<typeof LogoutPayloadSchema>;
