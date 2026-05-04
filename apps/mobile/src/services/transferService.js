// services/transferService.js
import { apiClient } from './apiClient';

export const transferMoneyAPI = async (fromAccount, toAccount, amount) => {
  try {
    const response = await apiClient('/transfer', { // Đường dẫn map với Route("api/transfer")
      method: 'POST',
      body: JSON.stringify({
        FromAccount: fromAccount,
        ToAccount: toAccount,
        Amount: parseFloat(amount) // Parse sang số thập phân để khớp với kiểu decimal ở C#
      }),
    });
    return response;
  } catch (error) {
    console.error("Lỗi khi chuyển tiền:", error);
    throw error;
  }
};