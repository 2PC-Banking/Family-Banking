import { apiClient } from './apiClient';

export const loginAPI = (phone, pass) => apiClient('/auth/login', { method: 'POST', body: JSON.stringify({ phone, pass }) });
export const getBalanceAPI = (accountnumber) => apiClient(`/account/balance/${accountnumber}`);
export const getHistoryAPI = (accountnumber) => apiClient(`/history/${accountnumber}`);
export const getAccountInfoAPI = (accountnumber) => apiClient(`/account/info/${accountnumber}`);

// THÊM API YÊU CẦU OTP:
export const requestOtpAPI = (accountNumber) => 
  apiClient('/otp/request', { method: 'POST', body: JSON.stringify({ AccountNumber: accountNumber }) });

// SỬA LẠI API TRANSFER (Thêm OtpCode):
export const transferAPI = (FromAccount, ToAccount, Amount, OtpCode, Note) => 
  apiClient('/transfer', { method: 'POST', body: JSON.stringify({ FromAccount, ToAccount, Amount, OtpCode, Note }) });