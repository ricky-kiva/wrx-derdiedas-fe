import z from 'zod';
import { GenderEnum } from '../shared/enums';

export const EndGamePayloadSchema = z.object({
  gameId: z.string(),
  name: z.string().optional()
});

export const GameAnswerPayloadSchema = z.object({
  gameId: z.string(),
  nounId: z.string(),
  answer: GenderEnum,
  userId: z.string().optional()
});

export const StartGamePayloadSchema = z.object({
  userId: z.string().optional()
});
