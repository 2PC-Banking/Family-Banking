// services/authService.js
import { apiClient } from './apiClient';

export const loginAPI = async (phone, pass) => {
  return await apiClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ phone, pass }),
  });
};