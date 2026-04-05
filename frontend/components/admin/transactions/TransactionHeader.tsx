'use client';

import { Download } from 'lucide-react';

interface TransactionHeaderProps {
  onExportClick: () => void;
}

export function TransactionHeader({ onExportClick }: TransactionHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-8 py-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Transactions</h1>
          <p className="text-slate-600 mt-1">View and manage all bank transactions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onExportClick}
            className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors bg-white"
          >
            <Download size={20} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}
