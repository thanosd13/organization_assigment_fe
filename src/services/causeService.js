import { http } from './httpService';

export const createService = body => {
  return http.post('/cause/create', body);
};

export const updateService = (id, body) => {
  return http.put('/cause/update/' + id, body);
};

export const updateStatusService = body => {
  return http.put('/cause/updateStatus', body);
};

export const requestJoinService = causeId => {
  return http.put('/cause/requestJoin/' + causeId);
};

export const getByUserService = () => {
  return http.get('/cause/getByUser');
};

export const getByIdService = id => {
  return http.get('/cause/getById/' + id);
};

export const getRequestedCausesFromUserService = () => {
  return http.get('/cause/getRequestedCausesFromUser');
};

export const getUsersFromCauseService = causeId => {
  return http.get('/cause/getUsersFromCause/' + causeId);
};

export const getAllService = () => {
  return http.get('/cause/getAllCauses');
};

export const deleteService = id => {
  return http.delete('/cause/delete/' + id);
};
