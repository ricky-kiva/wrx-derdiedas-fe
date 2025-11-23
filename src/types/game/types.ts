import type z from 'zod';
import type { GameAnswerPayloadSchema, StartGamePayloadSchema, EndGamePayloadSchema, UpdateGamePayloadSchema } from './schemas';
import type { Noun } from '../noun/types';

export type GameAnswerPayload = z.infer<typeof GameAnswerPayloadSchema>;
export type EndGamePayload = z.infer<typeof EndGamePayloadSchema>;
export type StartGamePayload = z.infer<typeof StartGamePayloadSchema>;
export type UpdateGamePayload = z.infer<typeof UpdateGamePayloadSchema>;

export interface GameAnswerData {
  correct: boolean;
  currentScore: number;
  nouns?: Omit<Noun, 'gender'>[];
}

export interface GetGameData {
  id: string;
  nouns: Omit<Noun, 'gender'>[],
  points: number
};

export interface StartGameData {
  id: string;
  nouns: Omit<Noun, 'gender'>[];
}

export interface EndGameData {
  userId?: string;
}

export interface UpdateGameData {
  gameId: string;
  nouns: Omit<Noun, 'gender'>[]
};
