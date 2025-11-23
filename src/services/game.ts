import config from '../commons/config';
import type { EndGameData, EndGamePayload, GameAnswerData, GameAnswerPayload, GetGameData, StartGameData, StartGamePayload, UpdateGameData, UpdateGamePayload } from '../types/game/types';
import { api } from '../lib/api/api';
import type { ApiResponse } from '../types/shared/types';
import type { CustomAxiosRequestConfig } from '../lib/api/types';

const gameRoute = `${config.api.base}/game`;

export const answerGame = async (gameId: string, payload: GameAnswerPayload) => {
  return api.post<ApiResponse<GameAnswerData>>(`${gameRoute}/${gameId}/answer`, payload);
};

export const deleteGame = async (gameId: string) => {
  return api.delete(`${gameRoute}/${gameId}`);
};

export const endGame = async (gameId: string, payload?: EndGamePayload) => {
  return api.post<ApiResponse<EndGameData>>(`${gameRoute}/${gameId}/end`, payload);
};

export const getGame = async(gameId: string, config?: CustomAxiosRequestConfig) => {
  return api.get<ApiResponse<GetGameData>>(`${gameRoute}/${gameId}`, config);
};

export const startGame = async (payload: StartGamePayload) => {
  return api.post<ApiResponse<StartGameData>>(`${gameRoute}/start`, payload);
};

export const updateGame = async (gameId: string, payload: UpdateGamePayload) => {
  return api.patch<ApiResponse<UpdateGameData>>(`${gameRoute}/${gameId}`, payload);
};
