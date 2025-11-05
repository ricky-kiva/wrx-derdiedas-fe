import axios from 'axios';
import config from '../../commons/config';

export const api = axios.create({
  baseURL: config.api.base,
  withCredentials: true
});
