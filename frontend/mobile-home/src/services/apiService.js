// services/apiService.js
import { apiClient } from './apiClient';

export const loginAPI = (phone, pass) => 
  apiClient('/auth/login', { method: 'POST', body: JSON.stringify({ phone, pass }) });

export const getBalanceAPI = (accountnumber) => 
  apiClient(`/account/balance/${accountnumber}`);

export const getHistoryAPI = (accountnumber) => 
  apiClient(`/history/${accountnumber}`);

export const transferAPI = (FromAccount, ToAccount, Amount) => 
  apiClient('/transfer', { method: 'POST', body: JSON.stringify({ FromAccount, ToAccount, Amount }) });