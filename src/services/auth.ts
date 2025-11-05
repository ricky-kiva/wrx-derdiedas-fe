import type { LoginPayload, LoginResponse, LogoutPayload, RefreshTokenResponse } from '../types/auth/types';
import config from '../commons/config';
import { api } from '../lib/api/api';

const authRoute = `${config.api.base}/auth`;

export const login = async (payload: LoginPayload) => {
  return api.post<LoginResponse>(`${authRoute}/login`, payload);
};

export const logout = async (payload: LogoutPayload) => {
  api.post(`${authRoute}/logout`, payload);
};

export const refreshToken = async () => {
  return api.post<RefreshTokenResponse>(`${authRoute}/refresh-token`);
};
