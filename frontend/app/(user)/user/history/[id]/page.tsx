'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { formatCurrency, formatDate, formatTime } from '@/lib/user-mock-data';
import {
  ArrowLeft,
  Share2,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  ArrowRight,
  Upload,
  BadgeCheck,
  Check,
} from 'lucide-react';

export default function TransactionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { transactions } = useUser();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  const transaction = useMemo(() => {
    return transactions.find((tx) => tx.id === params.id);
  }, [transactions, params.id]);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!transaction) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">Không tìm thấy giao dịch</p>
          <Link
            href="/user/history"
            className="text-[#1a365d] font-medium hover:underline"
          >
            Quay lại lịch sử
          </Link>
        </div>
      </div>
    );
  }

  const isOutgoing = transaction.amount < 0;
  const counterpartyName = isOutgoing ? transaction.recipientName : transaction.senderName;
  const counterpartyAccount = isOutgoing ? transaction.recipientAccount : transaction.senderAccount;
  const counterpartyBank = isOutgoing ? transaction.recipientBank : transaction.senderBank;

  const statusConfig = {
    success: {
      icon: CheckCircle2,
      label: 'Thành công',
      color: 'text-emerald-500',
      bg: 'bg-emerald-100',
    },
    pending: {
      icon: Clock,
      label: 'Đang xử lý',
      color: 'text-amber-500',
      bg: 'bg-amber-100',
    },
    failed: {
      icon: XCircle,
      label: 'Thất bại',
      color: 'text-red-500',
      bg: 'bg-red-100',
    },
  };

  const status = statusConfig[transaction.status];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-[#1a365d]">Chi tiết giao dịch</h1>
            </div>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Status & Amount */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className={`w-20 h-20 ${status.bg} rounded-full flex items-center justify-center`}>
                  <StatusIcon className={`w-12 h-12 ${status.color}`} />
                </div>
              </div>
              <p className={`text-4xl lg:text-5xl font-bold mb-3 ${transaction.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)} đ
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className={`w-2 h-2 rounded-full ${transaction.status === 'success' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <span className={`font-semibold ${transaction.status === 'success' ? 'text-emerald-600' : 'text-amber-600'}`}>
                  {status.label}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-0 space-y-3 border-t border-slate-100 mt-4">
              <Link
                href="/user/transfer"
                className="w-full py-4 bg-[#1a365d] hover:bg-[#2d4a7c] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Thực hiện giao dịch mới
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Chia sẻ biến động
              </button>
              <Link
                href="/user/history"
                className="w-full py-3 text-[#1a365d] font-medium hover:bg-slate-50 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                Xem lịch sử giao dịch
              </Link>
            </div>
          </div>

          {/* Right Column - Transaction Details */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h2 className="font-bold text-slate-900">Thông tin giao dịch</h2>
            </div>
            <div className="p-6 space-y-4">
              {/* Counterparty */}
              <div className="flex justify-between items-start py-3 border-b border-slate-100">
                <span className="text-slate-500">{isOutgoing ? 'Tên người nhận' : 'Người gửi'}</span>
                <span className="font-medium text-slate-900 text-right max-w-[60%]">
                  {isOutgoing ? `Chuyển đến: ${counterpartyAccount}` : counterpartyName}
                </span>
              </div>

              {/* Bank */}
              <div className="flex justify-between items-start py-3 border-b border-slate-100">
                <span className="text-slate-500">Ngân hàng</span>
                <div className="text-right">
                  <p className="font-medium text-slate-900">
                    {counterpartyBank?.includes('Heritage') ? 'Nội bộ' : 'Liên ngân hàng'}
                  </p>
                  <p className="text-sm text-slate-500">{counterpartyBank}</p>
                </div>
              </div>

              {/* Account */}
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500">Số tài khoản</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">Tài khoản liên kết</span>
                  <button
                    onClick={() => handleCopy(counterpartyAccount || '', 'account')}
                    className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                  >
                    {copiedField === 'account' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Time */}
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500">Thời gian</span>
                <span className="font-medium text-slate-900">
                  {formatTime(transaction.timestamp)} - {formatDate(transaction.timestamp)}
                </span>
              </div>

              {/* Note */}
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500">Nội dung</span>
                <span className="font-medium text-slate-900">{transaction.note || transaction.description}</span>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-between items-center py-3 border-b border-slate-100">
                <span className="text-slate-500">Mã giao dịch (TXN ID)</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium text-slate-900">{transaction.id}</span>
                  <button
                    onClick={() => handleCopy(transaction.id, 'txnId')}
                    className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                  >
                    {copiedField === 'txnId' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Auth Method */}
              <div className="flex justify-between items-center py-3">
                <span className="text-slate-500">Phương thức xác thực</span>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-[#1a365d]" />
                  <span className="font-medium text-slate-900">{transaction.authMethod || 'Smart OTP'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
