'use client';

import { ArrowUpDown, ChevronDown } from 'lucide-react';

interface Transaction {
  id: string;
  fromBank: string;
  toBank: string;
  amount: string;
  timestamp: string;
  status: 'Completed' | 'Processing' | 'Failed';
  error?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  onRowClick: (transaction: Transaction) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Processing':
      return 'bg-blue-100 text-blue-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-slate-100 text-slate-800';
  }
};

const getStatusDot = (status: string) => {
  switch (status) {
    case 'Completed':
      return 'bg-green-500';
    case 'Processing':
      return 'bg-blue-500';
    case 'Failed':
      return 'bg-red-500';
    default:
      return 'bg-slate-500';
  }
};

export function TransactionTable({ transactions, onRowClick }: TransactionTableProps) {
  return (
    <div className="w-full bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wide">
                Transaction ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wide">
                From Bank
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wide">
                To Bank
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-900 uppercase tracking-wide">
                Amount
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-900 uppercase tracking-wide">
                Timestamp
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-slate-900 uppercase tracking-wide">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                  No transactions found matching the current filters
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => onRowClick(transaction)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{transaction.fromBank}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{transaction.toBank}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{transaction.timestamp}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(transaction.status)}`} />
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      {transactions.length > 0 && (
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-600">
          Showing {transactions.length} transactions
        </div>
      )}
    </div>
  );
}
