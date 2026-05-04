import { AlertCircle } from 'lucide-react';

interface RecoveryAlertBannerProps {
  count: number;
}

export function RecoveryAlertBanner({ count }: RecoveryAlertBannerProps) {
  return (
    <div className="px-8 py-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex gap-4">
        <AlertCircle size={24} className="text-yellow-700 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-yellow-900">Uncertain Transactions</h3>
          <p className="text-sm text-yellow-800 mt-1">
            There are {count} transactions in an uncertain state that require resolution. These transactions may need to be committed or rolled back based on system recovery analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
