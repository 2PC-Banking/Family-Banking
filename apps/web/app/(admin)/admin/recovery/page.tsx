"use client";

import { useState } from 'react';
import { SystemStatus } from '@/components/admin/dashboard/SystemStatus';
import { RecoveryAlertBanner } from '@/components/admin/recovery/RecoveryAlertBanner';
import { RecoverySummaryCards } from '@/components/admin/recovery/RecoverySummaryCards';
import { UncertainTransactionsTable } from '@/components/admin/recovery/UncertainTransactionsTable';
import { RecoveryDetailModal } from '@/components/admin/recovery/RecoveryDetailModal';
import { RecoveryStrategy } from '@/components/admin/recovery/RecoveryStrategy';
import { uncertainTransactions, recoveryTransactionDetails } from '@/lib/mockData';

interface UncertainTransaction {
  id: string;
  timestamp: string;
  amount: string;
  fromBank: string;
  toBank: string;
  reason: string;
  reasonType: 'crash' | 'timeout' | 'network';
  duration: string;
  phase: string;
  coordinator: string;
  participants: string[];
}

export default function RecoveryPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<UncertainTransaction | null>(null);

  const totalAmount = uncertainTransactions.reduce((sum, tx) => {
    const amount = parseFloat(tx.amount.replace(/[$,]/g, ''));
    return sum + amount;
  }, 0);

  const handleCommit = (id: string) => {
    alert(`Commit initiated for transaction ${id}`);
    setSelectedTransaction(null);
  };

  const handleRollback = (id: string) => {
    alert(`Rollback initiated for transaction ${id}`);
    setSelectedTransaction(null);
  };

  const handleAutoRecoverAll = () => {
    alert('Auto-recovery process started for all uncertain transactions');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-100">
      {/* Header */}
      <SystemStatus />

      {/* Title Section */}
      <div className="px-8 py-6 bg-white border-b border-slate-200">
        <h1 className="text-3xl font-bold text-slate-900">Recovery</h1>
        <p className="text-slate-600 mt-1">Manage and resolve uncertain transactions from failed operations</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {/* Alert Banner */}
        <RecoveryAlertBanner count={uncertainTransactions.length} />

        {/* Summary Cards */}
        <RecoverySummaryCards
          uncertainCount={uncertainTransactions.length}
          totalAmount={`$${totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
          oldestDuration="8m 33s"
        />

        {/* Uncertain Transactions Table */}
        <UncertainTransactionsTable
          transactions={uncertainTransactions}
          onRowClick={setSelectedTransaction}
          onCommit={handleCommit}
          onRollback={handleRollback}
          onAutoRecoverAll={handleAutoRecoverAll}
        />

        {/* Recovery Strategy */}
        <RecoveryStrategy />
      </div>

      {/* Recovery Detail Modal */}
      <RecoveryDetailModal
        isOpen={selectedTransaction !== null}
        transaction={selectedTransaction}
        details={recoveryTransactionDetails}
        onClose={() => setSelectedTransaction(null)}
      />
    </div>
  );
}
