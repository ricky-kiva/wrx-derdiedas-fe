import config from '../commons/config';
import type { EndGameData, EndGamePayload, GameAnswerData, GameAnswerPayload, StartGameData, StartGamePayload } from '../types/game/types';
import { api } from '../lib/api/api';
import type { ApiResponse } from '../types/shared/types';

const gameRoute = `${config.api.base}/game`;

export const answerGame = async (gameId: string, payload: GameAnswerPayload) => {
  return api.post<ApiResponse<GameAnswerData>>(`${gameRoute}/${gameId}/answer`, payload);
};

export const endGame = async (gameId: string, payload?: EndGamePayload) => {
  return api.post<ApiResponse<EndGameData>>(`${gameRoute}/${gameId}/end`, payload);
};

export const startGame = async (payload: StartGamePayload) => {
  return api.post<ApiResponse<StartGameData>>(`${gameRoute}/start`, payload);
};
