'use client';

import { X, TrendingUp, Activity } from 'lucide-react';

interface Transaction {
  id: string;
  fromBank: string;
  toBank: string;
  amount: string;
  timestamp: string;
  status: string;
  error?: string;
}

interface BankDetailModalProps {
  isOpen: boolean;
  bank: {
    id: string;
    name: string;
    transactions: number;
    successRate: number;
    status: 'online' | 'warning' | 'offline';
  } | null;
  bankTransactions: Transaction[];
  onClose: () => void;
}

export function BankDetailModal({
  isOpen,
  bank,
  bankTransactions,
  onClose,
}: BankDetailModalProps) {
  if (!isOpen || !bank) return null;

  const statusColor = {
    online: 'text-green-500 bg-green-50',
    warning: 'text-yellow-500 bg-yellow-50',
    offline: 'text-red-500 bg-red-50',
  };

  const statusLabel = {
    online: 'Online',
    warning: 'Warning',
    offline: 'Offline',
  };

  const getTransactionStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Processing':
        return 'bg-blue-100 text-blue-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const completedCount = bankTransactions.filter((t) => t.status === 'Completed').length;
  const processingCount = bankTransactions.filter((t) => t.status === 'Processing').length;
  const failedCount = bankTransactions.filter((t) => t.status === 'Failed').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">{bank.name}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Bank Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={18} className="text-blue-600" />
                <p className="text-xs text-slate-600 font-medium">Total Transactions</p>
              </div>
              <p className="text-2xl font-bold text-slate-900">{bank.transactions}</p>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-xs text-slate-600 font-medium mb-2">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-xs text-slate-600 font-medium mb-2">Processing</p>
              <p className="text-2xl font-bold text-blue-600">{processingCount}</p>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-xs text-slate-600 font-medium mb-2">Failed</p>
              <p className="text-2xl font-bold text-red-600">{failedCount}</p>
            </div>
          </div>

          {/* Status and Success Rate */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`rounded-lg p-4 border ${statusColor[bank.status]}`}>
              <div className="flex items-center gap-2">
                <Activity size={18} />
                <div>
                  <p className="text-xs font-medium opacity-75">Status</p>
                  <p className="text-lg font-semibold">{statusLabel[bank.status]}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <p className="text-xs text-slate-600 font-medium mb-2">Success Rate</p>
              <p className="text-3xl font-bold text-slate-900">{bank.successRate}%</p>
            </div>
          </div>

          {/* Transactions Table */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
            {bankTransactions.length === 0 ? (
              <p className="text-center text-slate-500 py-8">No transactions found</p>
            ) : (
              <div className="space-y-3">
                {bankTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <p className="text-sm text-slate-500">ID: {transaction.id}</p>
                        <p className="text-sm font-medium text-slate-900 mt-1">
                          {transaction.fromBank} → {transaction.toBank}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTransactionStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-slate-500">Amount</p>
                        <p className="font-semibold text-slate-900">{transaction.amount}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Timestamp</p>
                        <p className="font-semibold text-slate-900">{transaction.timestamp}</p>
                      </div>
                      {transaction.error && (
                        <div>
                          <p className="text-slate-500">Error</p>
                          <p className="font-semibold text-red-600">{transaction.error}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
