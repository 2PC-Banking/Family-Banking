// Mock data for user frontend - no backend integration yet

export interface UserAccount {
  id: string;
  accountNumber: string;
  name: string;
  balance: number;
  type: 'checking' | 'savings';
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  type: 'transfer_out' | 'transfer_in' | 'bill_payment' | 'deposit';
  amount: number;
  status: 'success' | 'pending' | 'failed';
  timestamp: string;
  description: string;
  recipientName?: string;
  recipientAccount?: string;
  recipientBank?: string;
  senderName?: string;
  senderAccount?: string;
  senderBank?: string;
  note?: string;
  authMethod?: string;
}

export interface BankOption {
  id: string;
  name: string;
  shortName: string;
  isInternal: boolean;
}

// Current logged-in user mock data
export const currentUser = {
  id: 'CUS01',
  phone: '0900000000',
  name: 'Nguyen Van A',
  avatar: null,
  accounts: [
    {
      id: 'ACC01',
      accountNumber: '1000000001',
      name: 'Tài khoản thanh toán',
      balance: 5000000,
      type: 'checking' as const,
      isDefault: true,
    },
  ],
};

// Known recipients for mock lookup
export const knownRecipients: Record<string, { name: string; bank: string }> = {
  '1000000002': { name: 'TRAN THI B', bank: 'Heritage Digital Bank' },
  '1000000003': { name: 'LE VAN C', bank: 'Heritage Digital Bank' },
  '0123456789': { name: 'NGUYEN VAN D', bank: 'Vietcombank' },
};

// Bank options
export const bankOptions: BankOption[] = [
  { id: 'HDB', name: 'Heritage Digital Bank (Nội bộ)', shortName: 'HDB', isInternal: true },
  { id: 'VCB', name: 'Vietcombank', shortName: 'VCB', isInternal: false },
  { id: 'TCB', name: 'Techcombank', shortName: 'TCB', isInternal: false },
  { id: 'ACB', name: 'ACB', shortName: 'ACB', isInternal: false },
  { id: 'MB', name: 'MB Bank', shortName: 'MB', isInternal: false },
];

// Mock transactions
export const mockTransactions: Transaction[] = [
  {
    id: 'TX_EFDD410190_OUT',
    type: 'transfer_out',
    amount: -500000,
    status: 'success',
    timestamp: '2026-04-05T21:24:00',
    description: 'Chuyển tiền',
    recipientName: 'TRAN THI B',
    recipientAccount: '1000000002',
    recipientBank: 'Heritage Digital Bank',
    note: 'Chuyen tien',
    authMethod: 'Smart OTP',
  },
  {
    id: 'TX_4357FE3295_OUT',
    type: 'transfer_out',
    amount: -500000,
    status: 'success',
    timestamp: '2026-04-05T21:23:00',
    description: 'Chuyển tiền',
    recipientName: 'TRAN THI B',
    recipientAccount: '1000000002',
    recipientBank: 'Heritage Digital Bank',
    note: 'Thanh toan',
    authMethod: 'Smart OTP',
  },
  {
    id: 'TX02_IN',
    type: 'transfer_in',
    amount: 150000,
    status: 'success',
    timestamp: '2026-04-05T13:57:00',
    description: 'Nhận tiền',
    senderName: 'LE VAN C',
    senderAccount: '1000000003',
    senderBank: 'Heritage Digital Bank',
    note: 'Tra tien',
    authMethod: 'Smart OTP',
  },
  {
    id: 'TX01_OUT',
    type: 'transfer_out',
    amount: -200000,
    status: 'success',
    timestamp: '2026-04-04T19:57:00',
    description: 'Chuyển tiền',
    recipientName: 'TRAN THI B',
    recipientAccount: '1000000002',
    recipientBank: 'Heritage Digital Bank',
    note: 'Mua hang',
    authMethod: 'Smart OTP',
  },
  {
    id: 'TX03_BILL',
    type: 'bill_payment',
    amount: -350000,
    status: 'success',
    timestamp: '2026-04-03T10:30:00',
    description: 'Thanh toán hóa đơn điện',
    recipientName: 'EVN HCMC',
    recipientAccount: '9999000001',
    recipientBank: 'Vietcombank',
    note: 'Hoa don thang 3',
    authMethod: 'Smart OTP',
  },
];

// Helper to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN').format(amount);
}

// Helper to format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

// Helper to format time
export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Helper to format full datetime
export function formatDateTime(dateString: string): string {
  return `${formatTime(dateString)} - ${formatDate(dateString)}`;
}

// Valid OTP for mock verification
export const VALID_OTP = '123456';
