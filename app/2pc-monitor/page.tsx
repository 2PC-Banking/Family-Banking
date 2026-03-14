"use client";

import { useState } from 'react';
import { SystemStatus } from '@/components/dashboard/SystemStatus';
import { TwoPhaseCommitHeader } from '@/components/2pc-monitor/TwoPhaseCommitHeader';
import { TwoPhaseCommitTable } from '@/components/2pc-monitor/TwoPhaseCommitTable';
import { TwoPhaseCommitDetailModal } from '@/components/2pc-monitor/TwoPhaseCommitDetailModal';
import { twoPhaseCommitTransactions } from '@/lib/mockData';

interface TwoPhaseCommitTransaction {
  id: string;
  fromBank: string;
  toBank: string;
  amount: string;
  timestamp: string;
  phase: 'PREPARE' | 'COMMIT' | 'ABORT';
  status: 'Prepared' | 'Committed' | 'Pending' | 'Aborted';
  participants: number;
  coordinatorBank: string;
  reason?: string;
}

export default function TwoPhaseCommitMonitorPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<TwoPhaseCommitTransaction | null>(null);
  const [displayedTransactions, setDisplayedTransactions] = useState<TwoPhaseCommitTransaction[]>(twoPhaseCommitTransactions);

  const handleExport = () => {
    const csv = [
      ['Transaction ID', 'Date & Time', 'Amount', 'From Bank', 'To Bank', 'Phase', 'Status', 'Coordinator', 'Participants'],
      ...displayedTransactions.map((tx) => [
        tx.id,
        tx.timestamp,
        tx.amount,
        tx.fromBank,
        tx.toBank,
        tx.phase,
        tx.status,
        tx.coordinatorBank,
        tx.participants,
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `2pc_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-100">
      {/* Header */}
      <SystemStatus />

      <TwoPhaseCommitHeader
        onExportClick={handleExport}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto px-8 py-6">
        <TwoPhaseCommitTable
          transactions={twoPhaseCommitTransactions}
          onRowClick={setSelectedTransaction}
          onFilteredDataChange={setDisplayedTransactions}
        />
      </div>

      {/* 2PC Detail Modal */}
      <TwoPhaseCommitDetailModal
        isOpen={selectedTransaction !== null}
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
