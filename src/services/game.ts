import type { EndGameData, EndGamePayload, GameAnswerData, GameAnswerPayload, GetGameData, GetGameTokenData, StartGameData, StartGamePayload, UpdateGameData, UpdateGamePayload } from '../types/game/types';
import { api } from '../lib/api/api';
import type { ApiResponse } from '../types/shared/types';
import type { CustomAxiosRequestConfig } from '../lib/api/types';
import type { AxiosResponse } from 'axios';

const gameRoute = '/game';

export const answerGame = async (gameId: string, payload: GameAnswerPayload) => {
  const tokenRes = await getGameToken();
  if (tokenRes.data.status !== 'success') return tokenRes as AxiosResponse<ApiResponse<GameAnswerData>>;
  return api.post<ApiResponse<GameAnswerData>>(`${gameRoute}/${gameId}/answer/`, payload, {
    headers: { 'x-game-token': tokenRes.data.data.token }
  });
};

export const deleteGame = async (gameId: string) => {
  const tokenRes = await getGameToken();
  if (tokenRes.data.status !== 'success') return tokenRes as AxiosResponse;
  return api.delete(`${gameRoute}/${gameId}/`, {
    headers: { 'x-game-token': tokenRes.data.data.token }
  });
};

export const endGame = async (gameId: string, payload?: EndGamePayload) => {
  const tokenRes = await getGameToken();
  if (tokenRes.data.status !== 'success') return tokenRes as AxiosResponse<ApiResponse<EndGameData>>;
  return api.post<ApiResponse<EndGameData>>(`${gameRoute}/${gameId}/end/`, payload, {
    headers: { 'x-game-token': tokenRes.data.data.token }
  });
};

export const getGame = async(gameId: string, config?: CustomAxiosRequestConfig) => {
  return api.get<ApiResponse<GetGameData>>(`${gameRoute}/${gameId}/`, config);
};

export const getGameToken = async() => {
  return api.get<ApiResponse<GetGameTokenData>>(`${gameRoute}/token/`);
};

export const startGame = async (payload: StartGamePayload) => {
  const tokenRes = await getGameToken();
  if (tokenRes.data.status !== 'success') return tokenRes as AxiosResponse<ApiResponse<StartGameData>>;
  return api.post<ApiResponse<StartGameData>>(`${gameRoute}/start/`, payload, {
    headers: { 'x-game-token': tokenRes.data.data.token }
  });
};

export const updateGame = async (gameId: string, payload: UpdateGamePayload) => {
  const tokenRes = await getGameToken();
  if (tokenRes.data.status !== 'success') return tokenRes as AxiosResponse<ApiResponse<UpdateGameData>>;
  return api.patch<ApiResponse<UpdateGameData>>(`${gameRoute}/${gameId}/`, payload, {
    headers: { 'x-game-token': tokenRes.data.data.token }
  });
};
