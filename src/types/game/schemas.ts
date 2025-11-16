import z from 'zod';
import { GenderEnum, ResponseStatusEnum } from '../shared/enums';

const GameNounsSchema = z.object({
  id: z.string(),
  word: z.string(),
  meanings: z.array(z.string())
});

export const EndGamePayloadSchema = z.object({
  gameId: z.string(),
  name: z.string().optional()
});

export const EndGameResponseDataSchema = z.object({
  userId: z.string()
});

export const EndGameResponseSchema = z.object({
  status: ResponseStatusEnum,
  data: EndGameResponseDataSchema
});

export const GameAnswerPayloadSchema = z.object({
  gameId: z.string(),
  nounId: z.string(),
  answer: GenderEnum,
  userId: z.string().optional()
});

export const GameAnswerResponseDataSchema = z.object({
  correct: z.boolean(),
  currentScore: z.number(),
  nouns: z.array(GameNounsSchema).optional()
});

export const StartGamePayloadSchema = z.object({
  userId: z.string().optional()
});

export const GameAnswerResponseSchema = z.object({
  status: ResponseStatusEnum,
  data: GameAnswerResponseDataSchema
});



export const StartGameResponseDataSchema = z.object({
  gameId: z.string(),
  nouns: z.array(GameNounsSchema)
});

export const StartGameResponseSchema = z.object({
  status: ResponseStatusEnum,
  data: StartGameResponseDataSchema
});
