import { http } from './httpService';

export const createService = body => {
  return http.post('/cause/create', body);
};
