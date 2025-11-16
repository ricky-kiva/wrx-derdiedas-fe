import config from '../commons/config';
import type { EndGamePayload, EndGameResponse, GameAnswerPayload, GameAnswerResponse, StartGamePayload, StartGameResponse } from '../types/game/types';
import { api } from '../lib/api/api';

const gameRoute = `${config.api.base}/game`;

export const answerGame = async (payload: GameAnswerPayload) => {
  return api.post<GameAnswerResponse>(`${gameRoute}/answer`, payload);
};

export const endGame = async (payload: EndGamePayload) => {
  return api.post<EndGameResponse>(`${gameRoute}/end`, payload);
};

export const startGame = async (payload: StartGamePayload) => {
  return api.post<StartGameResponse>(`${gameRoute}/start`, payload);
};
