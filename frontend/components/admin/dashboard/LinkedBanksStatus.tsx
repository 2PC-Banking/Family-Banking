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

const BankCard = ({ bank, onClick, isSelected }: { bank: Bank; onClick: () => void; isSelected: boolean }) => {
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

  const bankNameColor = {
    'Premium Checking': 'text-blue-600',
    'Savings Plus': 'text-emerald-600',
    'Bank C': 'text-slate-900',
    'Bank D': 'text-slate-900',
  };

  const borderColor = {
    'Premium Checking': 'border-blue-200',
    'Savings Plus': 'border-emerald-200',
    'Bank C': 'border-slate-200',
    'Bank D': 'border-slate-200',
  };

  const selectedBg = {
    'Premium Checking': 'from-blue-50 to-blue-100 border-blue-500',
    'Savings Plus': 'from-emerald-50 to-emerald-100 border-emerald-500',
    'Bank C': 'from-slate-50 to-slate-100 border-slate-500',
    'Bank D': 'from-slate-50 to-slate-100 border-slate-500',
  };

  const selectedTextColor = {
    'Premium Checking': 'text-blue-900',
    'Savings Plus': 'text-emerald-900',
    'Bank C': 'text-slate-900',
    'Bank D': 'text-slate-900',
  };

  const selectedSubtextColor = {
    'Premium Checking': 'text-blue-700',
    'Savings Plus': 'text-emerald-700',
    'Bank C': 'text-slate-500',
    'Bank D': 'text-slate-500',
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-lg p-6 border-2 transition-all duration-200 cursor-pointer ${
        isSelected
          ? `bg-gradient-to-br ${selectedBg[bank.name as keyof typeof selectedBg]} shadow-xl scale-105`
          : `bg-slate-50 border-slate-200 hover:${borderColor[bank.name as keyof typeof borderColor]} hover:shadow-lg`
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${isSelected ? selectedTextColor[bank.name as keyof typeof selectedTextColor] : bankNameColor[bank.name as keyof typeof bankNameColor] || 'text-slate-900'}`}>
            {bank.name}
          </h3>
          <p className={`text-sm mt-1 ${isSelected ? selectedSubtextColor[bank.name as keyof typeof selectedSubtextColor] : 'text-slate-500'}`}>
            {bank.transactions} transactions
          </p>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${isSelected ? selectedTextColor[bank.name as keyof typeof selectedTextColor] : 'text-slate-900'}`}>
            {bank.successRate}%
          </p>
          <p className={`text-xs mt-1 ${isSelected ? selectedSubtextColor[bank.name as keyof typeof selectedSubtextColor] : 'text-slate-500'}`}>
            Success rate
          </p>
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
              isSelected={selectedBank?.id === bank.id}
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
