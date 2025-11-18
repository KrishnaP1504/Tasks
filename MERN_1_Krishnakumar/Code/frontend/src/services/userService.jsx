import api from './api';

export const getPublicContent = () => {
  return api.get('/users/public');
};

export const getUserProfile = () => {
  return api.get('/users/profile');
};

export const getAdminBoard = () => {
  return api.get('/users/all');
};