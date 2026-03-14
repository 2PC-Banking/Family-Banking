'use client';

import { useState } from 'react';
import {
  TrendingUp,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { TransactionDetailModal } from './TransactionDetailModal';
import { transactionDetails } from '@/lib/mockData';

interface StatCard {
  title: string;
  value: number;
  subtitle: string;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'yellow' | 'red';
  onClick?: () => void;
}

const StatCard = ({ title, value, subtitle, icon, color, onClick }: StatCard) => {
  const colorClasses = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    yellow: 'bg-yellow-50',
    red: 'bg-red-50',
  };

  const iconColorClasses = {
    blue: 'text-blue-300',
    green: 'text-green-300',
    yellow: 'text-yellow-300',
    red: 'text-red-300',
  };

  const formattedValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <div
      onClick={onClick}
      className={`${colorClasses[color]} rounded-lg p-6 border border-slate-100 cursor-pointer hover:shadow-md hover:scale-105 transition-all duration-200`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{formattedValue}</p>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
        <div className={`${iconColorClasses[color]} text-4xl`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

interface StatCardsProps {
  data: {
    totalTransactions: number;
    successful: number;
    processing: number;
    failed: number;
  };
}

export function StatCards({ data }: StatCardsProps) {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: 'successful' | 'processing' | 'failed' | null;
  }>({
    isOpen: false,
    type: null,
  });

  const successRate = ((data.successful / data.totalTransactions) * 100).toFixed(1);
  const errorRate = ((data.failed / data.totalTransactions) * 100).toFixed(1);

  const getTransactionsByType = (type: 'successful' | 'processing' | 'failed') => {
    return transactionDetails[type];
  };

  const handleOpenModal = (type: 'successful' | 'processing' | 'failed') => {
    setModalState({ isOpen: true, type });
  };

  const handleCloseModal = () => {
    setModalState({ isOpen: false, type: null });
  };

  const getModalTitle = () => {
    switch (modalState.type) {
      case 'successful':
        return 'Successful Transactions';
      case 'processing':
        return 'Processing Transactions';
      case 'failed':
        return 'Failed Transactions';
      default:
        return '';
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-6 px-8 py-6">
        <StatCard
          title="Total Transactions"
          value={data.totalTransactions}
          subtitle="Today"
          icon={<TrendingUp size={32} />}
          color="blue"
        />
        <StatCard
          title="Successful"
          value={data.successful}
          subtitle={`${successRate}% success rate`}
          icon={<CheckCircle size={32} />}
          color="green"
          onClick={() => handleOpenModal('successful')}
        />
        <StatCard
          title="Processing"
          value={data.processing}
          subtitle="In queue"
          icon={<Clock size={32} />}
          color="yellow"
          onClick={() => handleOpenModal('processing')}
        />
        <StatCard
          title="Failed"
          value={data.failed}
          subtitle={`${errorRate}% error rate`}
          icon={<XCircle size={32} />}
          color="red"
          onClick={() => handleOpenModal('failed')}
        />
      </div>

      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        isOpen={modalState.isOpen}
        title={getModalTitle()}
        transactions={
          modalState.type ? getTransactionsByType(modalState.type) : []
        }
        onClose={handleCloseModal}
      />
    </>
  );
}
