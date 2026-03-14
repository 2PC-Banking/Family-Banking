"use client";

import { useState } from 'react';
import { SystemStatus } from '@/components/dashboard/SystemStatus';
import { TransactionHeader } from '@/components/transactions/TransactionHeader';
import { TransactionTableNew } from '@/components/transactions/TransactionTableNew';
import { TransactionDetailModal } from '@/components/transactions/TransactionDetailModal';
import { allTransactions } from '@/lib/mockData';

interface Transaction {
  id: string;
  fromBank: string;
  toBank: string;
  amount: string;
  timestamp: string;
  type: string;
  status: 'Completed' | 'Processing' | 'Failed';
  error?: string;
}

export default function TransactionsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>(allTransactions);

  const handleExport = () => {
    const csv = [
      ['Transaction ID', 'Date & Time', 'Amount', 'From Bank', 'To Bank', 'Type', 'Status'],
      ...displayedTransactions.map((tx) => [
        tx.id,
        tx.timestamp,
        tx.amount,
        tx.fromBank,
        tx.toBank,
        tx.type,
        tx.status,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-100">
      {/* Header */}
      <SystemStatus />

      <TransactionHeader
        onExportClick={handleExport}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <TransactionTableNew
          transactions={allTransactions}
          onRowClick={setSelectedTransaction}
          onFilteredDataChange={setDisplayedTransactions}
        />
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        isOpen={selectedTransaction !== null}
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
