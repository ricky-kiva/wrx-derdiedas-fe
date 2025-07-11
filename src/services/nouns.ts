import axios from 'axios';
import type { SearchNounResponse } from '../types/types';
import config from '../commons/config';

export const getByWord = async (word: string) => {
  return axios.post<SearchNounResponse>(
    `${config.api.base}/search`, 
    { word }
  );
};
