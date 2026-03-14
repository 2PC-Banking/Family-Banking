'use client';

import { X, AlertCircle, CheckCircle2, Clock, Copy } from 'lucide-react';
import { useState } from 'react';

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

interface TransactionDetailModalProps {
  isOpen: boolean;
  transaction: Transaction | null;
  onClose: () => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'Completed':
      return {
        icon: CheckCircle2,
        color: 'text-green-600 bg-green-50',
        badgeColor: 'bg-green-100 text-green-800',
        label: 'Transaction Completed',
      };
    case 'Processing':
      return {
        icon: Clock,
        color: 'text-blue-600 bg-blue-50',
        badgeColor: 'bg-blue-100 text-blue-800',
        label: 'Transaction Processing',
      };
    case 'Failed':
      return {
        icon: AlertCircle,
        color: 'text-red-600 bg-red-50',
        badgeColor: 'bg-red-100 text-red-800',
        label: 'Transaction Failed',
      };
    default:
      return {
        icon: Clock,
        color: 'text-slate-600 bg-slate-50',
        badgeColor: 'bg-slate-100 text-slate-800',
        label: 'Unknown Status',
      };
  }
};

export function TransactionDetailModal({
  isOpen,
  transaction,
  onClose,
}: TransactionDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !transaction) return null;

  const statusConfig = getStatusConfig(transaction.status);
  const StatusIcon = statusConfig.icon;

  const handleCopyId = () => {
    navigator.clipboard.writeText(transaction.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `
TRANSACTION RECEIPT
================================
Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Transaction ID: ${transaction.id}
Status: ${transaction.status}

TRANSACTION DETAILS
================================
Amount: ${transaction.amount}
Type: ${transaction.type}
Date & Time: ${transaction.timestamp}

TRANSACTION PATH
================================
From: ${transaction.fromBank}
To: ${transaction.toBank}

${transaction.status === 'Failed' && transaction.error ? `ERROR INFORMATION
================================
Error: ${transaction.error}
` : ''}
================================
This is an automatically generated receipt.
Please keep this for your records.
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${transaction.id}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${statusConfig.color}`}>
              <StatusIcon size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">{transaction.id}</h2>
              <p className="text-sm text-slate-600 mt-1">{statusConfig.label}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors p-2"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${statusConfig.badgeColor}`}
            >
              {transaction.status}
            </span>
            {transaction.status === 'Processing' && (
              <span className="text-xs text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                Estimated completion: ~5 minutes
              </span>
            )}
          </div>

          {/* Transaction Path */}
          <div className="bg-slate-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Transaction Path</h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-2">
                  {transaction.fromBank.split(' ')[1]}
                </div>
                <p className="text-sm font-medium text-slate-900">{transaction.fromBank}</p>
                <p className="text-xs text-slate-500">Sender</p>
              </div>
              <div className="flex-1 mx-4">
                <div className="h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                <p className="text-xs text-center text-slate-600 mt-2 font-semibold">{transaction.amount}</p>
              </div>
              <div className="text-center">
                <div className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-2">
                  {transaction.toBank.split(' ')[1]}
                </div>
                <p className="text-sm font-medium text-slate-900">{transaction.toBank}</p>
                <p className="text-xs text-slate-500">Receiver</p>
              </div>
            </div>
          </div>

          {/* Transaction Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Amount</p>
              <p className="text-2xl font-bold text-slate-900 mt-2">{transaction.amount}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Transaction Date</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.timestamp}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">From Bank</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.fromBank}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">To Bank</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.toBank}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Transaction Type</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.type}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Status</p>
              <p className="text-sm font-semibold text-slate-900 mt-2">{transaction.status}</p>
            </div>
          </div>

          {/* Transaction ID with Copy */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Transaction ID</p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-sm font-mono font-semibold text-blue-900">{transaction.id}</p>
              <button
                onClick={handleCopyId}
                className={`p-2 rounded-lg transition-colors ${
                  copied
                    ? 'bg-green-100 text-green-600'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          {/* Error Details (if failed) */}
          {transaction.status === 'Failed' && transaction.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-900">Error Details</h4>
                  <p className="text-sm text-red-800 mt-1">{transaction.error}</p>
                  <button className="text-xs text-red-700 font-semibold mt-3 hover:underline">
                    View Retry Options
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200">
            <div>
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Status</p>
              <p className="text-sm font-semibold text-slate-900 mt-1">
                {transaction.status === 'Completed' && '✓ Successfully processed'}
                {transaction.status === 'Processing' && '⏳ In queue'}
                {transaction.status === 'Failed' && '✗ Failed to process'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-600 font-medium uppercase tracking-wide">Reference Number</p>
              <p className="text-sm font-mono text-slate-900 mt-1">{transaction.id}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={handleDownloadReceipt}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Download Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
