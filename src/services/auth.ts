import type { LoginPayload, LoginData, LogoutPayload, RefreshTokenData } from '../types/auth/types';
import config from '../commons/config';
import { api } from '../lib/api/api';
import type { ApiResponse } from '../types/shared/types';

const authRoute = `${config.api.base}/auth`;

export const login = async (payload: LoginPayload) => {
  return api.post<ApiResponse<LoginData>>(`${authRoute}/login`, payload);
};

export const logout = async (payload: LogoutPayload) => {
  api.post(`${authRoute}/logout`, payload);
};

export const refreshToken = async () => {
  return api.post<ApiResponse<RefreshTokenData>>(`${authRoute}/refresh-token`);
};
