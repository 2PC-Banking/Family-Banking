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

// 2PC Monitor data
export const twoPhaseCommitTransactions = [
  { 
    id: '2PC-001', 
    fromBank: 'Bank A', 
    toBank: 'Bank B', 
    amount: '$125,450.00', 
    timestamp: '2024-02-06 14:32:21', 
    phase: 'PREPARE', 
    status: 'Prepared' as const, 
    participants: 2, 
    coordinatorBank: 'Bank A',
    phaseStartTime: '14:32:21',
    phaseEndTime: '14:32:35',
    participantStatuses: [
      { bank: 'Bank A', status: 'Ready', timestamp: '14:32:35' },
      { bank: 'Bank B', status: 'Ready', timestamp: '14:32:36' },
    ]
  },
  { 
    id: '2PC-002', 
    fromBank: 'Bank B', 
    toBank: 'Bank C', 
    amount: '$89,200.50', 
    timestamp: '2024-02-06 14:25:15', 
    phase: 'COMMIT', 
    status: 'Committed' as const, 
    participants: 3, 
    coordinatorBank: 'Bank B',
    phaseStartTime: '14:25:15',
    phaseEndTime: '14:25:22',
    participantStatuses: [
      { bank: 'Bank B', status: 'Ready', timestamp: '14:25:18' },
      { bank: 'Bank C', status: 'Ready', timestamp: '14:25:19' },
    ]
  },
  { 
    id: '2PC-003', 
    fromBank: 'Bank C', 
    toBank: 'Bank D', 
    amount: '$234,100.00', 
    timestamp: '2024-02-06 14:18:42', 
    phase: 'PREPARE', 
    status: 'Pending' as const, 
    participants: 2, 
    coordinatorBank: 'Bank C',
    phaseStartTime: '14:18:42',
    phaseEndTime: '',
    participantStatuses: [
      { bank: 'Bank C', status: 'Waiting', timestamp: '14:18:42' },
      { bank: 'Bank D', status: 'Waiting', timestamp: '' },
    ]
  },
  { 
    id: '2PC-004', 
    fromBank: 'Bank D', 
    toBank: 'Bank A', 
    amount: '$45,600.25', 
    timestamp: '2024-02-06 14:12:08', 
    phase: 'COMMIT', 
    status: 'Committed' as const, 
    participants: 4, 
    coordinatorBank: 'Bank D',
    phaseStartTime: '14:12:08',
    phaseEndTime: '14:12:18',
    participantStatuses: [
      { bank: 'Bank D', status: 'Ready', timestamp: '14:12:12' },
      { bank: 'Bank A', status: 'Ready', timestamp: '14:12:13' },
    ]
  },
  { 
    id: '2PC-005', 
    fromBank: 'Bank A', 
    toBank: 'Bank C', 
    amount: '$156,300.00', 
    timestamp: '2024-02-06 14:05:33', 
    phase: 'ABORT', 
    status: 'Aborted' as const, 
    participants: 2, 
    coordinatorBank: 'Bank A', 
    reason: 'Validation failed',
    phaseStartTime: '14:05:33',
    phaseEndTime: '14:05:42',
    participantStatuses: [
      { bank: 'Bank A', status: 'Failed', timestamp: '14:05:38' },
      { bank: 'Bank C', status: 'Failed', timestamp: '14:05:39' },
    ]
  },
  { 
    id: '2PC-006', 
    fromBank: 'Bank B', 
    toBank: 'Bank D', 
    amount: '$78,900.75', 
    timestamp: '2024-02-06 13:58:19', 
    phase: 'COMMIT', 
    status: 'Committed' as const, 
    participants: 3, 
    coordinatorBank: 'Bank B',
    phaseStartTime: '13:58:19',
    phaseEndTime: '13:58:26',
    participantStatuses: [
      { bank: 'Bank B', status: 'Ready', timestamp: '13:58:22' },
      { bank: 'Bank D', status: 'Ready', timestamp: '13:58:23' },
    ]
  },
  { 
    id: '2PC-007', 
    fromBank: 'Bank C', 
    toBank: 'Bank A', 
    amount: '$312,450.00', 
    timestamp: '2024-02-06 13:51:44', 
    phase: 'PREPARE', 
    status: 'Prepared' as const, 
    participants: 2, 
    coordinatorBank: 'Bank C',
    phaseStartTime: '13:51:44',
    phaseEndTime: '13:51:52',
    participantStatuses: [
      { bank: 'Bank C', status: 'Ready', timestamp: '13:51:48' },
      { bank: 'Bank A', status: 'Ready', timestamp: '13:51:49' },
    ]
  },
  { 
    id: '2PC-008', 
    fromBank: 'Bank D', 
    toBank: 'Bank B', 
    amount: '$67,200.50', 
    timestamp: '2024-02-06 13:45:12', 
    phase: 'COMMIT', 
    status: 'Committed' as const, 
    participants: 3, 
    coordinatorBank: 'Bank D',
    phaseStartTime: '13:45:12',
    phaseEndTime: '13:45:19',
    participantStatuses: [
      { bank: 'Bank D', status: 'Ready', timestamp: '13:45:15' },
      { bank: 'Bank B', status: 'Ready', timestamp: '13:45:16' },
    ]
  },
  { 
    id: '2PC-009', 
    fromBank: 'Bank A', 
    toBank: 'Bank D', 
    amount: '$93,750.00', 
    timestamp: '2024-02-06 13:38:55', 
    phase: 'PREPARE', 
    status: 'Pending' as const, 
    participants: 4, 
    coordinatorBank: 'Bank A',
    phaseStartTime: '13:38:55',
    phaseEndTime: '',
    participantStatuses: [
      { bank: 'Bank A', status: 'Waiting', timestamp: '13:38:55' },
      { bank: 'Bank D', status: 'Waiting', timestamp: '' },
    ]
  },
  { 
    id: '2PC-010', 
    fromBank: 'Bank B', 
    toBank: 'Bank A', 
    amount: '$142,500.00', 
    timestamp: '2024-02-06 13:32:10', 
    phase: 'ABORT', 
    status: 'Aborted' as const, 
    participants: 2, 
    coordinatorBank: 'Bank B', 
    reason: 'Timeout on participant',
    phaseStartTime: '13:32:10',
    phaseEndTime: '13:32:25',
    participantStatuses: [
      { bank: 'Bank B', status: 'Failed', timestamp: '13:32:15' },
      { bank: 'Bank A', status: 'Failed', timestamp: '13:32:16' },
    ]
  },
];

// Recovery transactions (uncertain transactions)
export const uncertainTransactions = [
  {
    id: 'TXN-005',
    timestamp: '2024-02-06 14:05:33',
    amount: '$156,300.00',
    fromBank: 'Bank A',
    toBank: 'Bank B',
    reason: 'Coordinator crash during phase 2',
    reasonType: 'crash' as const,
    duration: '2m 45s',
    phase: 'COMMIT' as const,
    coordinator: 'Bank A',
    participants: ['Bank A', 'Bank B'],
    status: 'uncertain',
  },
  {
    id: 'TXN-009',
    timestamp: '2024-02-06 13:32:18',
    amount: '$98,750.50',
    fromBank: 'Bank C',
    toBank: 'Bank D',
    reason: 'Participant timeout during prepare',
    reasonType: 'timeout' as const,
    duration: '5m 12s',
    phase: 'PREPARE' as const,
    coordinator: 'Bank C',
    participants: ['Bank C', 'Bank D'],
    status: 'uncertain',
  },
  {
    id: 'TXN-012',
    timestamp: '2024-02-06 12:58:42',
    amount: '$234,500.00',
    fromBank: 'Bank B',
    toBank: 'Bank A',
    reason: 'Network failure during commit phase',
    reasonType: 'network' as const,
    duration: '8m 33s',
    phase: 'COMMIT' as const,
    coordinator: 'Bank B',
    participants: ['Bank B', 'Bank A'],
    status: 'uncertain',
  },
];

export const recoveryTransactionDetails = {
  'TXN-005': {
    id: 'TXN-005',
    coordinator: 'Bank A',
    participants: [
      { bank: 'Bank A', status: 'Unknown', lastUpdate: '14:05:33' },
      { bank: 'Bank B', status: 'Unknown', lastUpdate: '14:05:30' },
    ],
    phase: 'COMMIT',
    reason: 'Coordinator crash during phase 2',
    logs: [
      { time: '14:05:33', message: 'Coordinator (Bank A) initiated COMMIT phase' },
      { time: '14:05:35', message: 'Bank B received COMMIT request' },
      { time: '14:05:40', message: 'Coordinator became unresponsive' },
      { time: '14:05:42', message: 'Bank B waiting for confirmation' },
    ],
  },
  'TXN-009': {
    id: 'TXN-009',
    coordinator: 'Bank C',
    participants: [
      { bank: 'Bank C', status: 'Prepared', lastUpdate: '13:32:25' },
      { bank: 'Bank D', status: 'Timeout', lastUpdate: '13:32:18' },
    ],
    phase: 'PREPARE',
    reason: 'Participant timeout during prepare',
    logs: [
      { time: '13:32:18', message: 'Coordinator (Bank C) sent PREPARE request' },
      { time: '13:32:20', message: 'Bank D received PREPARE request' },
      { time: '13:32:40', message: 'Bank D did not respond to PREPARE request' },
      { time: '13:32:55', message: 'PREPARE phase timeout detected' },
    ],
  },
  'TXN-012': {
    id: 'TXN-012',
    coordinator: 'Bank B',
    participants: [
      { bank: 'Bank B', status: 'Committed', lastUpdate: '12:58:52' },
      { bank: 'Bank A', status: 'Unknown', lastUpdate: '12:58:42' },
    ],
    phase: 'COMMIT',
    reason: 'Network failure during commit phase',
    logs: [
      { time: '12:58:42', message: 'Coordinator (Bank B) initiated COMMIT phase' },
      { time: '12:58:45', message: 'Bank A received COMMIT request' },
      { time: '12:58:50', message: 'Bank B confirmed COMMIT execution' },
      { time: '12:58:55', message: 'Network connection to Bank A lost' },
    ],
  },
};

export const twoPhaseCommitDetails = [
  {
    id: '2PC-001',
    fromBank: 'Bank A',
    toBank: 'Bank B',
    amount: '$125,450.00',
    timestamp: '2024-02-06 14:32:21',
    phase: 'PREPARE',
    status: 'Prepared' as const,
    participants: 2,
    coordinatorBank: 'Bank A',
    startTime: '2024-02-06 14:32:21',
    prepareTime: '2024-02-06 14:32:35',
    votes: [
      { bank: 'Bank A', vote: 'YES', timestamp: '2024-02-06 14:32:35' },
      { bank: 'Bank B', vote: 'YES', timestamp: '2024-02-06 14:32:36' },
    ],
  },
];
