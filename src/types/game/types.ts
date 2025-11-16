import type z from 'zod';
import type { GameAnswerResponseDataSchema, GameAnswerResponseSchema, GameAnswerPayloadSchema, StartGamePayloadSchema, StartGameResponseDataSchema, StartGameResponseSchema, EndGamePayloadSchema, EndGameResponseDataSchema, EndGameResponseSchema } from './schemas';

export type GameAnswerPayload = z.infer<typeof GameAnswerPayloadSchema>;
export type GameAnswerResponseData = z.infer<typeof GameAnswerResponseDataSchema>;
export type GameAnswerResponse = z.infer<typeof GameAnswerResponseSchema>;
export type StartGamePayload = z.infer<typeof StartGamePayloadSchema>;
export type StartGameResponseData = z.infer<typeof StartGameResponseDataSchema>;
export type StartGameResponse = z.infer<typeof StartGameResponseSchema>;
export type EndGamePayload = z.infer<typeof EndGamePayloadSchema>;
export type EndGameResponseData = z.infer<typeof EndGameResponseDataSchema>;
export type EndGameResponse = z.infer<typeof EndGameResponseSchema>;
