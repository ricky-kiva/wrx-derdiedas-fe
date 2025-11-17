import type { AxiosError } from 'axios';
import { api } from './api';
import type { RetriableAxiosRequestConfig } from './types';
import { refreshToken } from '../../services/auth';
import { isApiResponse } from '../../types/shared/validators';
import { parseErrorMessage } from '../../utils/error';

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
      const originalReq = e.config as RetriableAxiosRequestConfig;

      if (e.response?.status === 401 && !originalReq._retry) {
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
      const body = res.data;

      if (!isApiResponse(body)) {
        const err = new Error('Malformed API response');

        setToast(err.message);

        return Promise.reject(err);
      }

      if (body.status !== 'success') setToast(body.message);
      
      return res;
    },
    (err: AxiosError) => {
      const msg = parseErrorMessage(err);

      setToast(msg);
      
      return Promise.reject(err);
    }
  );
}
