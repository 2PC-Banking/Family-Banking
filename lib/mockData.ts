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
};

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
