'use client';

import { X } from 'lucide-react';

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
  coordinator: string;
  participants: string[];
}

interface RecoveryDetailModalProps {
  isOpen: boolean;
  transaction: UncertainTransaction | null;
  details: any;
  onClose: () => void;
}

const statusColors = {
  'Prepared': 'bg-blue-100 text-blue-800',
  'Committed': 'bg-green-100 text-green-800',
  'Unknown': 'bg-slate-100 text-slate-800',
  'Timeout': 'bg-yellow-100 text-yellow-800',
  'Failed': 'bg-red-100 text-red-800',
  'Ready': 'bg-green-100 text-green-800',
  'Waiting': 'bg-yellow-100 text-yellow-800',
};

export function RecoveryDetailModal({ isOpen, transaction, details, onClose }: RecoveryDetailModalProps) {
  if (!isOpen || !transaction) return null;

  const txDetails = details?.[transaction.id];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{transaction.id}</h2>
            <p className="text-sm text-slate-600 mt-1">Recovery Details</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Transaction Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase">Transaction ID</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.id}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase">Status</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">Uncertain</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase">Amount</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.amount}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase">Duration</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.duration}</p>
            </div>
          </div>

          {/* Transaction Path */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="font-semibold text-slate-900 mb-4">Transaction Path</h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm mb-2">
                  {transaction.fromBank.split(' ')[1]}
                </div>
                <p className="text-sm font-medium text-slate-900">{transaction.fromBank}</p>
              </div>
              <div className="flex-1 mx-4 h-1 bg-slate-300 rounded-full"></div>
              <div className="text-center">
                <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-sm mb-2">
                  {transaction.toBank.split(' ')[1]}
                </div>
                <p className="text-sm font-medium text-slate-900">{transaction.toBank}</p>
              </div>
            </div>
          </div>

          {/* Coordinator Info */}
          {txDetails && (
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-600 font-medium uppercase">Coordinator</p>
                <p className="text-sm font-semibold text-slate-900 mt-2">{txDetails.coordinator}</p>
              </div>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-xs text-slate-600 font-medium uppercase">Phase</p>
                <p className="text-sm font-semibold text-slate-900 mt-2">{txDetails.phase}</p>
              </div>
            </div>
          )}

          {/* Participants */}
          {txDetails && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Participants</h3>
              <div className="space-y-2">
                {txDetails.participants.map((p: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-slate-900">{p.bank}</p>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[p.status as keyof typeof statusColors] || 'bg-slate-100 text-slate-800'}`}>
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logs */}
          {txDetails && (
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Recovery Logs</h3>
              <div className="space-y-2 bg-slate-50 p-4 rounded-lg max-h-48 overflow-y-auto">
                {txDetails.logs.map((log: any, idx: number) => (
                  <div key={idx} className="text-xs text-slate-700 pb-2 border-b border-slate-200 last:border-b-0">
                    <span className="font-mono text-slate-500">{log.time}</span>
                    <p className="text-slate-700">{log.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
