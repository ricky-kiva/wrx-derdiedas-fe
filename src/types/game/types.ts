import type z from 'zod';
import type { GameAnswerPayloadSchema, StartGamePayloadSchema, EndGamePayloadSchema } from './schemas';
import type { Noun } from '../noun/types';

export type GameAnswerPayload = z.infer<typeof GameAnswerPayloadSchema>;
export type StartGamePayload = z.infer<typeof StartGamePayloadSchema>;
export type EndGamePayload = z.infer<typeof EndGamePayloadSchema>;

export interface GameAnswerData {
  correct: boolean;
  currentScore: number;
  nouns?: Omit<Noun, 'gender'>[];
}

export interface StartGameData {
  gameId: string;
  nouns: Omit<Noun, 'gender'>[];
}

export interface EndGameData {
  userId: string;
}
