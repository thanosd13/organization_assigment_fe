import { http } from './httpService';

export const loginService = body => {
  return http.post('/user/login', body);
};
