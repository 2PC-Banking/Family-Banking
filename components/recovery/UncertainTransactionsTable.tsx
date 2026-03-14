'use client';

import { Eye } from 'lucide-react';

interface UncertainTransaction {
  id: string;
  timestamp: string;
  amount: string;
  fromBank: string;
  toBank: string;
  reason: string;
  reasonType: 'crash' | 'timeout' | 'network';
  duration: string;
  phase: string;
}

interface UncertainTransactionsTableProps {
  transactions: UncertainTransaction[];
  onRowClick: (transaction: UncertainTransaction) => void;
  onCommit: (id: string) => void;
  onRollback: (id: string) => void;
  onAutoRecoverAll: () => void;
}

export function UncertainTransactionsTable({
  transactions,
  onRowClick,
  onCommit,
  onRollback,
  onAutoRecoverAll,
}: UncertainTransactionsTableProps) {
  return (
    <div className="px-8 py-6">
      <div className="bg-white rounded-lg border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Uncertain Transactions</h2>
          <button
            onClick={onAutoRecoverAll}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            <span>▶</span>
            Auto-Recover All
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">From Bank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">To Bank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Reason</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Duration</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-200 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{tx.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.timestamp}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{tx.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.fromBank}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.toBank}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.reason}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{tx.duration}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRowClick(tx)}
                        className="flex items-center gap-1 px-2 py-1 border border-slate-300 rounded text-slate-700 hover:bg-slate-50 text-xs font-medium transition-colors"
                      >
                        <Eye size={14} />
                        Details
                      </button>
                      <button
                        onClick={() => onCommit(tx.id)}
                        className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium hover:bg-green-100 transition-colors"
                      >
                        Commit
                      </button>
                      <button
                        onClick={() => onRollback(tx.id)}
                        className="px-2 py-1 bg-red-50 text-red-700 border border-red-200 rounded text-xs font-medium hover:bg-red-100 transition-colors"
                      >
                        Rollback
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
