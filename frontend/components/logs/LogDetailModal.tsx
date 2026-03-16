'use client';

import { X } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  source: string;
  message: string;
  transactionId: string | null;
}

interface LogDetailModalProps {
  isOpen: boolean;
  log: Log | null;
  onClose: () => void;
}

const levelColors = {
  INFO: 'bg-blue-50 border-blue-200',
  SUCCESS: 'bg-green-50 border-green-200',
  WARNING: 'bg-yellow-50 border-yellow-200',
  ERROR: 'bg-red-50 border-red-200',
};

const levelTextColors = {
  INFO: 'text-blue-700',
  SUCCESS: 'text-green-700',
  WARNING: 'text-yellow-700',
  ERROR: 'text-red-700',
};

export function LogDetailModal({ isOpen, log, onClose }: LogDetailModalProps) {
  if (!isOpen || !log) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="text-lg font-semibold text-slate-900">Log Details</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Level Badge */}
          <div className={`px-4 py-3 rounded-lg border ${levelColors[log.level]}`}>
            <p className={`font-semibold ${levelTextColors[log.level]}`}>{log.level}</p>
          </div>

          {/* Log ID */}
          <div>
            <label className="text-sm font-medium text-slate-600">Log ID</label>
            <p className="text-slate-900 mt-1 font-mono bg-slate-50 px-3 py-2 rounded border border-slate-200">{log.id}</p>
          </div>

          {/* Timestamp */}
          <div>
            <label className="text-sm font-medium text-slate-600">Timestamp</label>
            <p className="text-slate-900 mt-1">{log.timestamp}</p>
          </div>

          {/* Source */}
          <div>
            <label className="text-sm font-medium text-slate-600">Source</label>
            <p className="text-slate-900 mt-1 font-semibold">{log.source}</p>
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-slate-600">Message</label>
            <p className="text-slate-900 mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 leading-relaxed">
              {log.message}
            </p>
          </div>

          {/* Transaction ID */}
          {log.transactionId && (
            <div>
              <label className="text-sm font-medium text-slate-600">Transaction ID</label>
              <p className="text-slate-900 mt-1 font-mono bg-blue-50 px-3 py-2 rounded border border-blue-200 text-blue-700">
                {log.transactionId}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
