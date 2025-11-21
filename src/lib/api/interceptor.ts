import type { AxiosError } from 'axios';
import { api } from './api';
import { refreshToken } from '../../services/auth';
import { isApiResponse } from '../../types/shared/validators';
import { parseErrorMessage } from '../../utils/error';
import type { CustomAxiosRequestConfig } from './types';

export function setupReqAuthInterceptor(accessToken: (string | null)) {
  const reqInterceptor = api.interceptors.request.use((config) => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  });

  return () => api.interceptors.request.eject(reqInterceptor);
}

export function setupResAuthInterceptor(
  setAccessToken: ((token: (string | null)) => void),
  setToast: (msg: (string | null)) => void
) {
  const resInterceptor = api.interceptors.response.use(
    (res) => res,
    async (e: AxiosError) => {
      const REFRESH_URL = '/auth/refresh-token';

      const originalReq = e.config as CustomAxiosRequestConfig;

      if (e.response?.status === 401 
        && !originalReq._retry 
        && !originalReq.url?.includes(REFRESH_URL)
      ) {
        originalReq._retry = true;

        try {
          const refreshRes = await refreshToken();

          if (refreshRes.data.status === 'success') {
            const newToken = refreshRes.data.data.accessToken;

            setAccessToken(newToken);

            originalReq.headers = originalReq.headers || {};
            originalReq.headers.Authorization = `Bearer ${newToken}`;

            return api(originalReq);
          }
        } catch {
          setAccessToken(null);
          setToast("Session has expired. Please log in again");
        }
      }

      return Promise.reject(e);
    }
  );

  return () => api.interceptors.response.eject(resInterceptor);
}

export function setupResErrorInterceptor(setToast: (msg: (string | null)) => void) {
  api.interceptors.response.use(
    (res) => {
      const config = res.config as CustomAxiosRequestConfig;
      const body = res.data;

      if (!isApiResponse(body)) {
        const err = new Error('Malformed API response');

        if (!config._silent) setToast(err.message);

        return Promise.reject(err);
      }

      if (body.status !== 'success' && !config._silent) setToast(body.message);
      
      return res;
    },
    (e: AxiosError) => {
      const config = e.config as CustomAxiosRequestConfig;
      const msg = parseErrorMessage(e);

      if (!config._silent) setToast(msg);
      
      return Promise.reject(e);
    }
  );
}
