import config from '../commons/config';
import type { ApiResponse } from '../types/shared/types';
import { api } from '../lib/api/api';
import type { SearchedNoun } from '../types/noun/types';

export const getByWord = async (word: string) => {
  return api.post<ApiResponse<SearchedNoun[]>>(`${config.api.base}/search`, { word });
};
