import { http } from './httpService';

export const createService = body => {
  return http.post('/cause/create', body);
};

export const updateService = (id, body) => {
  return http.put('/cause/update/' + id, body);
};

export const deleteService = id => {
  return http.delete('/cause/delete/' + id);
};

export const getByUserService = () => {
  return http.get('/cause/getByUser');
};

export const getByIdService = id => {
  return http.get('/cause/getById/' + id);
};

export const requestJoinService = causeId => {
  return http.put('/cause/requestJoin/' + causeId);
};

export const getAllService = () => {
  return http.get('/cause/getAllCauses');
};
