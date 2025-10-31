import z from 'zod';
import { GenderEnum, ResponseStatusEnum } from '../shared/enums';

export const GameAnswerSchema = z.object({
  gameId: z.string().min(1),
  nounId: z.string().min(1),
  gender: GenderEnum,
  userId: z.string().optional()
});

export const GameAnswerResponseDataSchema = z.object({
  correct: z.boolean(),
  currentScore: z.number()
});

export const GameAnswerResponseSchema = z.object({
  status: ResponseStatusEnum,
  data: GameAnswerResponseDataSchema
});
