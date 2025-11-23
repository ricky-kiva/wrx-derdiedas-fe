import z from 'zod';
import { GenderEnum } from '../shared/enums';

export const EndGamePayloadSchema = z.object({
  name: z.string().optional()
});

export const GameAnswerPayloadSchema = z.object({
  nounId: z.string(),
  answer: GenderEnum,
  userId: z.string().optional()
});

export const StartGamePayloadSchema = z.object({
  userId: z.string().optional()
});

export const UpdateGamePayloadSchema = z.object({
  userId: z.string().optional()
});
