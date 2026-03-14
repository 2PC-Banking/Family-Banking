// Mock data for Bank Admin Management System

export const transactionVolumeData = [
  { time: '00:00', volume: 20 },
  { time: '04:00', volume: 25 },
  { time: '08:00', volume: 32 },
  { time: '12:00', volume: 45 },
  { time: '16:00', volume: 38 },
  { time: '20:00', volume: 52 },
  { time: '23:59', volume: 48 },
];

export const successRateTrendData = [
  { time: '00:00', rate: 96 },
  { time: '04:00', rate: 96.5 },
  { time: '08:00', rate: 97 },
  { time: '12:00', rate: 97.5 },
  { time: '16:00', rate: 97.2 },
  { time: '20:00', rate: 95.8 },
  { time: '23:59', rate: 96.2 },
];

export const linkedBanksData = [
  {
    id: 'bank-a',
    name: 'Bank A',
    transactions: 245,
    successRate: 98.5,
    status: 'online',
  },
  {
    id: 'bank-b',
    name: 'Bank B',
    transactions: 189,
    successRate: 97.2,
    status: 'online',
  },
  {
    id: 'bank-c',
    name: 'Bank C',
    transactions: 312,
    successRate: 99.1,
    status: 'online',
  },
  {
    id: 'bank-d',
    name: 'Bank D',
    transactions: 78,
    successRate: 94.8,
    status: 'warning',
  },
];

export const dashboardStatsData = {
  totalTransactions: 2847,
  successful: 2741,
  processing: 73,
  failed: 33,
};

// Detailed transaction data for modals
export const transactionDetails = {
  successful: [
    { id: '001', fromBank: 'Bank A', toBank: 'Bank B', amount: '$50,000', timestamp: '08:23:45', status: 'Completed' },
    { id: '002', fromBank: 'Bank C', toBank: 'Bank A', amount: '$75,500', timestamp: '08:24:12', status: 'Completed' },
    { id: '003', fromBank: 'Bank B', toBank: 'Bank D', amount: '$32,100', timestamp: '08:25:33', status: 'Completed' },
    { id: '004', fromBank: 'Bank D', toBank: 'Bank C', amount: '$120,000', timestamp: '08:26:11', status: 'Completed' },
    { id: '005', fromBank: 'Bank A', toBank: 'Bank C', amount: '$45,600', timestamp: '08:27:22', status: 'Completed' },
  ],
  processing: [
    { id: 'P001', fromBank: 'Bank B', toBank: 'Bank A', amount: '$60,000', timestamp: '08:28:45', status: 'Processing' },
    { id: 'P002', fromBank: 'Bank C', toBank: 'Bank D', amount: '$85,500', timestamp: '08:29:12', status: 'Processing' },
    { id: 'P003', fromBank: 'Bank A', toBank: 'Bank B', amount: '$35,200', timestamp: '08:30:33', status: 'Processing' },
  ],
  failed: [
    { id: 'F001', fromBank: 'Bank D', toBank: 'Bank B', amount: '$90,000', timestamp: '08:20:15', status: 'Failed', error: 'Insufficient funds' },
    { id: 'F002', fromBank: 'Bank A', toBank: 'Bank C', amount: '$55,000', timestamp: '08:21:30', status: 'Failed', error: 'Network timeout' },
  ],
};

// Bank-specific transaction details
export const bankTransactionDetails: Record<string, any[]> = {
  'bank-a': [
    { id: '001', fromBank: 'Bank B', toBank: 'Bank A', amount: '$50,000', timestamp: '08:23:45', status: 'Completed' },
    { id: '002', fromBank: 'Bank C', toBank: 'Bank A', amount: '$75,500', timestamp: '08:24:12', status: 'Completed' },
    { id: '003', fromBank: 'Bank A', toBank: 'Bank C', amount: '$45,600', timestamp: '08:27:22', status: 'Completed' },
    { id: '004', fromBank: 'Bank A', toBank: 'Bank B', amount: '$60,000', timestamp: '08:28:45', status: 'Processing' },
  ],
  'bank-b': [
    { id: '005', fromBank: 'Bank A', toBank: 'Bank B', amount: '$50,000', timestamp: '08:23:45', status: 'Completed' },
    { id: '006', fromBank: 'Bank B', toBank: 'Bank D', amount: '$32,100', timestamp: '08:25:33', status: 'Completed' },
    { id: '007', fromBank: 'Bank B', toBank: 'Bank A', amount: '$60,000', timestamp: '08:28:45', status: 'Processing' },
  ],
  'bank-c': [
    { id: '008', fromBank: 'Bank C', toBank: 'Bank A', amount: '$75,500', timestamp: '08:24:12', status: 'Completed' },
    { id: '009', fromBank: 'Bank D', toBank: 'Bank C', amount: '$120,000', timestamp: '08:26:11', status: 'Completed' },
    { id: '010', fromBank: 'Bank A', toBank: 'Bank C', amount: '$45,600', timestamp: '08:27:22', status: 'Completed' },
    { id: '011', fromBank: 'Bank C', toBank: 'Bank D', amount: '$85,500', timestamp: '08:29:12', status: 'Processing' },
  ],
  'bank-d': [
    { id: '012', fromBank: 'Bank B', toBank: 'Bank D', amount: '$32,100', timestamp: '08:25:33', status: 'Completed' },
    { id: '013', fromBank: 'Bank D', toBank: 'Bank C', amount: '$120,000', timestamp: '08:26:11', status: 'Completed' },
    { id: '014', fromBank: 'Bank D', toBank: 'Bank B', amount: '$90,000', timestamp: '08:20:15', status: 'Failed', error: 'Insufficient funds' },
  ],
} as const;

// Comprehensive transaction list for transactions page
export const allTransactions = [
  { id: 'TXN-001', fromBank: 'Bank A', toBank: 'Bank C', amount: '$125,450.00', timestamp: '2024-02-06 14:32:21', type: 'Transfer', status: 'Completed' as const },
  { id: 'TXN-002', fromBank: 'Bank B', toBank: 'Bank D', amount: '$89,200.50', timestamp: '2024-02-06 14:25:15', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-003', fromBank: 'Bank C', toBank: 'Bank A', amount: '$234,100.00', timestamp: '2024-02-06 14:18:42', type: 'Transfer', status: 'Processing' as const },
  { id: 'TXN-004', fromBank: 'Bank D', toBank: 'Bank B', amount: '$45,600.25', timestamp: '2024-02-06 14:12:08', type: 'Withdrawal', status: 'Completed' as const },
  { id: 'TXN-005', fromBank: 'Bank A', toBank: 'Bank B', amount: '$156,300.00', timestamp: '2024-02-06 14:05:33', type: 'Transfer', status: 'Failed' as const, error: 'Insufficient funds' },
  { id: 'TXN-006', fromBank: 'Bank C', toBank: 'Bank D', amount: '$78,900.75', timestamp: '2024-02-06 13:58:19', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-007', fromBank: 'Bank B', toBank: 'Bank A', amount: '$312,450.00', timestamp: '2024-02-06 13:51:44', type: 'Transfer', status: 'Completed' as const },
  { id: 'TXN-008', fromBank: 'Bank D', toBank: 'Bank C', amount: '$67,200.50', timestamp: '2024-02-06 13:45:12', type: 'Payment', status: 'Processing' as const },
  { id: 'TXN-009', fromBank: 'Bank A', toBank: 'Bank D', amount: '$93,750.00', timestamp: '2024-02-06 13:38:55', type: 'Transfer', status: 'Completed' as const },
  { id: 'TXN-010', fromBank: 'Bank B', toBank: 'Bank C', amount: '$142,500.00', timestamp: '2024-02-06 13:32:10', type: 'Deposit', status: 'Failed' as const, error: 'Invalid account' },
  { id: 'TXN-011', fromBank: 'Bank C', toBank: 'Bank B', amount: '$87,625.50', timestamp: '2024-02-06 13:25:44', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-012', fromBank: 'Bank D', toBank: 'Bank A', amount: '$198,300.00', timestamp: '2024-02-06 13:18:22', type: 'Transfer', status: 'Processing' as const },
  { id: 'TXN-013', fromBank: 'Bank A', toBank: 'Bank C', amount: '$54,900.75', timestamp: '2024-02-06 13:12:05', type: 'Withdrawal', status: 'Completed' as const },
  { id: 'TXN-014', fromBank: 'Bank B', toBank: 'Bank D', amount: '$176,450.00', timestamp: '2024-02-06 13:05:33', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-015', fromBank: 'Bank C', toBank: 'Bank A', amount: '$267,800.00', timestamp: '2024-02-06 12:58:18', type: 'Transfer', status: 'Failed' as const, error: 'Network timeout' },
  { id: 'TXN-016', fromBank: 'Bank D', toBank: 'Bank B', amount: '$102,350.50', timestamp: '2024-02-06 12:51:42', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-017', fromBank: 'Bank A', toBank: 'Bank B', amount: '$134,200.00', timestamp: '2024-02-06 12:44:11', type: 'Transfer', status: 'Processing' as const },
  { id: 'TXN-018', fromBank: 'Bank C', toBank: 'Bank D', amount: '$189,600.75', timestamp: '2024-02-06 12:37:25', type: 'Deposit', status: 'Completed' as const },
  { id: 'TXN-019', fromBank: 'Bank B', toBank: 'Bank A', amount: '$97,550.00', timestamp: '2024-02-06 12:30:44', type: 'Withdrawal', status: 'Completed' as const },
  { id: 'TXN-020', fromBank: 'Bank D', toBank: 'Bank C', amount: '$156,900.50', timestamp: '2024-02-06 12:23:10', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-021', fromBank: 'Bank A', toBank: 'Bank D', amount: '$223,400.00', timestamp: '2024-02-06 12:16:33', type: 'Transfer', status: 'Failed' as const, error: 'Insufficient funds' },
  { id: 'TXN-022', fromBank: 'Bank B', toBank: 'Bank C', amount: '$145,750.75', timestamp: '2024-02-06 12:09:22', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-023', fromBank: 'Bank C', toBank: 'Bank A', amount: '$178,300.00', timestamp: '2024-02-06 12:02:55', type: 'Transfer', status: 'Processing' as const },
  { id: 'TXN-024', fromBank: 'Bank D', toBank: 'Bank B', amount: '$89,600.50', timestamp: '2024-02-06 11:55:11', type: 'Deposit', status: 'Completed' as const },
  { id: 'TXN-025', fromBank: 'Bank A', toBank: 'Bank C', amount: '$267,450.00', timestamp: '2024-02-06 11:48:44', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-026', fromBank: 'Bank B', toBank: 'Bank D', amount: '$112,300.75', timestamp: '2024-02-06 11:41:22', type: 'Transfer', status: 'Failed' as const, error: 'Service unavailable' },
  { id: 'TXN-027', fromBank: 'Bank C', toBank: 'Bank B', amount: '$198,900.00', timestamp: '2024-02-06 11:34:33', type: 'Withdrawal', status: 'Completed' as const },
  { id: 'TXN-028', fromBank: 'Bank D', toBank: 'Bank A', amount: '$145,200.50', timestamp: '2024-02-06 11:27:10', type: 'Payment', status: 'Processing' as const },
  { id: 'TXN-029', fromBank: 'Bank A', toBank: 'Bank B', amount: '$234,600.00', timestamp: '2024-02-06 11:20:44', type: 'Transfer', status: 'Completed' as const },
  { id: 'TXN-030', fromBank: 'Bank C', toBank: 'Bank D', amount: '$178,450.75', timestamp: '2024-02-06 11:13:18', type: 'Deposit', status: 'Completed' as const },
  { id: 'TXN-031', fromBank: 'Bank B', toBank: 'Bank A', amount: '$267,800.00', timestamp: '2024-02-06 11:06:55', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-032', fromBank: 'Bank D', toBank: 'Bank C', amount: '$156,300.50', timestamp: '2024-02-06 10:59:33', type: 'Transfer', status: 'Processing' as const },
  { id: 'TXN-033', fromBank: 'Bank A', toBank: 'Bank D', amount: '$189,700.00', timestamp: '2024-02-06 10:52:11', type: 'Withdrawal', status: 'Failed' as const, error: 'Invalid account' },
  { id: 'TXN-034', fromBank: 'Bank B', toBank: 'Bank C', amount: '$234,450.75', timestamp: '2024-02-06 10:45:22', type: 'Payment', status: 'Completed' as const },
  { id: 'TXN-035', fromBank: 'Bank C', toBank: 'Bank A', amount: '$145,900.00', timestamp: '2024-02-06 10:38:44', type: 'Transfer', status: 'Completed' as const },
  { id: 'TXN-036', fromBank: 'Bank D', toBank: 'Bank B', amount: '$267,600.50', timestamp: '2024-02-06 10:31:10', type: 'Deposit', status: 'Completed' as const },
  { id: 'TXN-037', fromBank: 'Bank A', toBank: 'Bank C', amount: '$123,450.00', timestamp: '2024-02-06 10:24:33', type: 'Payment', status: 'Processing' as const },
  { id: 'TXN-038', fromBank: 'Bank B', toBank: 'Bank D', amount: '$178,300.75', timestamp: '2024-02-06 10:17:55', type: 'Transfer', status: 'Completed' as const },
  { id: 'TXN-039', fromBank: 'Bank C', toBank: 'Bank B', amount: '$234,700.00', timestamp: '2024-02-06 10:10:22', type: 'Withdrawal', status: 'Failed' as const, error: 'Network timeout' },
  { id: 'TXN-040', fromBank: 'Bank D', toBank: 'Bank A', amount: '$145,600.50', timestamp: '2024-02-06 10:03:44', type: 'Payment', status: 'Completed' as const },
];

export const getCurrentTime = (): string => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const date = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();
  return `${hours}:${minutes}:${seconds} ${date}/${month}/${year}`;
};
