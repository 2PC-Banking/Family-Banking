'use client';

import { X } from 'lucide-react';

interface Transaction {
  id: string;
  fromBank: string;
  toBank: string;
  amount: string;
  timestamp: string;
  status: string;
  error?: string;
}

interface TransactionDetailModalProps {
  isOpen: boolean;
  title: string;
  transactions: Transaction[];
  onClose: () => void;
}

export function TransactionDetailModal({
  isOpen,
  title,
  transactions,
  onClose,
}: TransactionDetailModalProps) {
  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] overflow-auto mx-4">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {transactions.length === 0 ? (
            <p className="text-center text-slate-500">No transactions found</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-sm text-slate-500">Transaction ID: {transaction.id}</p>
                      <p className="text-sm font-medium text-slate-900 mt-1">
                        {transaction.fromBank} → {transaction.toBank}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
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
  );
}
