'use client';

import { Download } from 'lucide-react';

interface LogsHeaderProps {
  onExportClick: () => void;
}

export function LogsHeader({ onExportClick }: LogsHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-200 px-8 py-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">System Logs</h1>
          <p className="text-slate-600 mt-1">View and analyze system events and transaction logs</p>
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
