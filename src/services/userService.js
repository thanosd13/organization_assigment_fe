import { http } from './httpService';

export const loginService = body => {
  return http.post('/user/login', body);
};

export const registerService = body => {
  return http.post('/user/register', body);
};

export const getUsernameService = userId => {
  return http.get('/user/getUsername/' + userId);
};

export const getUserService = userId => {
  return http.get('/user/getUser/' + userId);
};

export const getAllUserService = () => {
  return http.get('/user/getAllUsers');
};

export const updateUserService = (body, userId) => {
  return http.put('/user/updateUser/' + userId, body);
};

export const deleteUserService = userId => {
  return http.delete('/user/deleteUser/' + userId);
};
