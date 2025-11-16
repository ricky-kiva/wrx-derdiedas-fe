import config from '../commons/config';
import type { EndGameData, EndGamePayload, GameAnswerData, GameAnswerPayload, StartGameData, StartGamePayload } from '../types/game/types';
import { api } from '../lib/api/api';
import type { ApiResponse } from '../types/shared/types';

const gameRoute = `${config.api.base}/game`;

export const answerGame = async (payload: GameAnswerPayload) => {
  return api.post<ApiResponse<GameAnswerData>>(`${gameRoute}/answer`, payload);
};

export const endGame = async (payload: EndGamePayload) => {
  return api.post<ApiResponse<EndGameData>>(`${gameRoute}/end`, payload);
};

export const startGame = async (payload: StartGamePayload) => {
  return api.post<ApiResponse<StartGameData>>(`${gameRoute}/start`, payload);
};
