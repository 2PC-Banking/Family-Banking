import { AlertCircle, Clock, TrendingDown } from 'lucide-react';

interface RecoverySummaryCardsProps {
  uncertainCount: number;
  totalAmount: string;
  oldestDuration: string;
}

export function RecoverySummaryCards({ uncertainCount, totalAmount, oldestDuration }: RecoverySummaryCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-6 px-8 py-6">
      {/* Uncertain Count */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Uncertain Count</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{uncertainCount}</p>
            <p className="text-xs text-slate-500 mt-1">Awaiting resolution</p>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <AlertCircle size={24} className="text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Total Amount */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Total Amount</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{totalAmount}</p>
            <p className="text-xs text-slate-500 mt-1">At risk</p>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <TrendingDown size={24} className="text-red-600" />
          </div>
        </div>
      </div>

      {/* Oldest Duration */}
      <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-slate-600 text-sm font-medium">Oldest Duration</p>
            <p className="text-3xl font-bold text-slate-900 mt-2">{oldestDuration}</p>
            <p className="text-xs text-slate-500 mt-1">Pending resolution</p>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <Clock size={24} className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
