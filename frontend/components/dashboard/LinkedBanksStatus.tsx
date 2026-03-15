'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { BankDetailModal } from './BankDetailModal';
import { bankTransactionDetails } from '@/lib/mockData';

interface Bank {
  id: string;
  name: string;
  transactions: number;
  successRate: number;
  status: 'online' | 'warning' | 'offline';
}

interface LinkedBanksStatusProps {
  banks: Bank[];
}

const BankCard = ({ bank, onClick }: { bank: Bank; onClick: () => void }) => {
  const statusColor = {
    online: 'text-green-500',
    warning: 'text-yellow-500',
    offline: 'text-red-500',
  };

  const statusLabel = {
    online: 'Online',
    warning: 'Warning',
    offline: 'Offline',
  };

  return (
    <div
      onClick={onClick}
      className="bg-slate-50 rounded-lg p-6 border border-slate-200 hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{bank.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{bank.transactions} transactions</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-slate-900">{bank.successRate}%</p>
          <p className="text-xs text-slate-500 mt-1">Success rate</p>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-200">
        <div className={`w-3 h-3 rounded-full ${statusColor[bank.status]}`} />
        <span className={`text-sm font-medium ${statusColor[bank.status]}`}>
          {statusLabel[bank.status]}
        </span>
      </div>
    </div>
  );
};

export function LinkedBanksStatus({ banks }: LinkedBanksStatusProps) {
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);

  return (
    <>
      <div className="px-8 py-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Linked Banks Status</h2>
        <div className="grid grid-cols-2 gap-6">
          {banks.map((bank) => (
            <BankCard
              key={bank.id}
              bank={bank}
              onClick={() => setSelectedBank(bank)}
            />
          ))}
        </div>
      </div>

      {/* Bank Detail Modal */}
      <BankDetailModal
        isOpen={selectedBank !== null}
        bank={selectedBank}
        bankTransactions={
          selectedBank ? bankTransactionDetails[selectedBank.id] || [] : []
        }
        onClose={() => setSelectedBank(null)}
      />
    </>
  );
}
