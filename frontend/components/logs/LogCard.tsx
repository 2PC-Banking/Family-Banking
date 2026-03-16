'use client';

import { AlertCircle, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  source: string;
  message: string;
  transactionId: string | null;
}

interface LogCardProps {
  log: Log;
  onClick: (log: Log) => void;
}

const levelConfig = {
  INFO: { icon: Info, color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-900', label: 'INFO', labelColor: 'bg-blue-100 text-blue-800' },
  SUCCESS: { icon: CheckCircle, color: 'bg-green-50 border-green-200', textColor: 'text-green-900', label: 'SUCCESS', labelColor: 'bg-green-100 text-green-800' },
  WARNING: { icon: AlertTriangle, color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-900', label: 'WARNING', labelColor: 'bg-yellow-100 text-yellow-800' },
  ERROR: { icon: XCircle, color: 'bg-red-50 border-red-200', textColor: 'text-red-900', label: 'ERROR', labelColor: 'bg-red-100 text-red-800' },
};

export function LogCard({ log, onClick }: LogCardProps) {
  const config = levelConfig[log.level];
  const Icon = config.icon;

  return (
    <button
      onClick={() => onClick(log)}
      className={`w-full text-left p-4 rounded-lg border ${config.color} hover:shadow-md transition-all cursor-pointer`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.textColor}`} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-1 rounded text-xs font-semibold ${config.labelColor}`}>
              {config.label}
            </span>
            <span className="text-xs text-slate-500">{log.timestamp}</span>
            {log.transactionId && (
              <span className="ml-auto text-xs font-semibold text-slate-700">{log.transactionId}</span>
            )}
          </div>
          
          <div className="mb-2">
            <span className={`text-sm font-semibold ${config.textColor}`}>{log.source}</span>
          </div>
          
          <p className={`text-sm ${config.textColor} break-words`}>{log.message}</p>
        </div>
      </div>
    </button>
  );
}
