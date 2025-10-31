import axios from 'axios';
import config from '../commons/config';
import type { SearchNounResponse } from '../types/search/types';

export const getByWord = async (word: string) => {
  return axios.post<SearchNounResponse>(
    `${config.api.base}/search`, 
    { word }
  );
};
