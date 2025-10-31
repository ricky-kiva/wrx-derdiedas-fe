import type z from 'zod';
import type { GameAnswerResponseDataSchema, GameAnswerResponseSchema, GameAnswerSchema } from './schemas';

export type GameAnswer = z.infer<typeof GameAnswerSchema>;
export type GameAnswerResponseData = z.infer<typeof GameAnswerResponseDataSchema>;
export type GameAnswerResponse = z.infer<typeof GameAnswerResponseSchema>;
