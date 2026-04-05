'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { formatCurrency } from '@/lib/user-mock-data';
import {
  CheckCircle2,
  ArrowRight,
  Home,
  Copy,
  History,
  Share2,
  ArrowLeft,
  ShieldCheck,
  Check,
} from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();
  const { lastCompletedTransfer } = useUser();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Redirect if no completed transfer
  useEffect(() => {
    if (!lastCompletedTransfer) {
      router.replace('/user');
    }
  }, [lastCompletedTransfer, router]);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!lastCompletedTransfer) {
    return null;
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

  const isInternal = lastCompletedTransfer.recipientBank.includes('Heritage');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/user"
                className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold text-[#1a365d]">Chi tiết giao dịch</h1>
            </div>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Success Status */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="py-12 px-6 text-center">
              {/* Success Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-14 h-14 text-white" />
                </div>
              </div>

              {/* Amount */}
              <div className="mb-4">
                <span className="text-4xl sm:text-5xl font-bold text-slate-900">
                  -{formatCurrency(lastCompletedTransfer.amount)} đ
                </span>
              </div>

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span className="text-emerald-700 font-semibold">Thành công</span>
              </div>

              {/* Quick Actions for Desktop */}
              <div className="mt-8 pt-8 border-t border-slate-100 hidden lg:block">
                <div className="flex flex-col gap-3">
                  <Link
                    href="/user/transfer"
                    className="w-full py-3.5 bg-[#1a365d] hover:bg-[#2d4a7c] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    Thực hiện giao dịch mới
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/user"
                    className="w-full py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Về trang chủ
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Transaction Details */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Thông tin giao dịch</h2>
            </div>
            <div className="p-6 space-y-5">
              {/* Recipient Name */}
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 shrink-0">Tên người nhận</span>
                <span className="font-semibold text-slate-900 text-right">
                  {lastCompletedTransfer.recipientName}
                </span>
              </div>

              {/* Account Number */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-500 shrink-0">Số tài khoản</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-slate-900">
                    {lastCompletedTransfer.toAccount}
                  </span>
                  <button
                    onClick={() => handleCopy(lastCompletedTransfer.toAccount, 'account')}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {copiedField === 'account' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Bank */}
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 shrink-0">Ngân hàng</span>
                <div className="text-right">
                  <div className="font-semibold text-slate-900">
                    {isInternal ? 'Nội bộ' : 'Liên ngân hàng'}
                  </div>
                  <div className="text-sm text-slate-500">{lastCompletedTransfer.recipientBank}</div>
                </div>
              </div>

              {/* Time */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-500 shrink-0">Thời gian</span>
                <span className="font-semibold text-slate-900">
                  {formatTime(lastCompletedTransfer.timestamp)} - {formatDate(lastCompletedTransfer.timestamp)}
                </span>
              </div>

              {/* Content */}
              <div className="flex justify-between items-start gap-4">
                <span className="text-slate-500 shrink-0">Nội dung</span>
                <span className="font-semibold text-slate-900 text-right">
                  {lastCompletedTransfer.note || 'Chuyển tiền'}
                </span>
              </div>

              {/* Transaction ID */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-500 shrink-0">Mã giao dịch</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold text-slate-900 text-sm">
                    {lastCompletedTransfer.id}
                  </span>
                  <button
                    onClick={() => handleCopy(lastCompletedTransfer.id, 'txn')}
                    className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    {copiedField === 'txn' ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Auth Method */}
              <div className="flex justify-between items-center gap-4">
                <span className="text-slate-500 shrink-0">Phương thức xác thực</span>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#1a365d]" />
                  <span className="font-semibold text-slate-900">Smart OTP</span>
                </div>
              </div>
            </div>

            {/* View History Link */}
            <div className="p-6 pt-0">
              <Link
                href="/user/history"
                className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-[#1a365d] font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <History className="w-5 h-5" />
                Xem lịch sử giao dịch
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="mt-6 space-y-3 lg:hidden">
          <Link
            href="/user/transfer"
            className="w-full py-4 bg-[#1a365d] hover:bg-[#2d4a7c] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Thực hiện giao dịch mới
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            href="/user"
            className="w-full py-4 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
