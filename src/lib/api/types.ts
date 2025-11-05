import type { AxiosRequestConfig } from 'axios';

export interface RetriableAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}
