'use client';

import { useEffect, useState } from 'react';
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
  Check,
} from 'lucide-react';

export default function SuccessPage() {
  const {
    lastCompletedTransfer,
    setPendingTransfer,
  } = useUser();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    setPendingTransfer(null);
  }, [setPendingTransfer]);

  if (!lastCompletedTransfer) {
    return (
      <div className="p-6 text-center text-slate-500">
        Không có dữ liệu giao dịch
      </div>
    );
  }

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const timestamp =
    typeof lastCompletedTransfer.timestamp === 'string'
      ? lastCompletedTransfer.timestamp
      : '';

  const dateObj = timestamp ? new Date(timestamp) : null;

  const formattedTime = dateObj
    ? dateObj.toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '';

  const formattedDate = dateObj
    ? dateObj.toLocaleDateString('vi-VN')
    : '';

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/user" className="p-2 hover:bg-slate-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#1a365d]">
              Giao dịch thành công
            </h1>
          </div>
          <Share2 className="w-5 h-5 text-slate-500" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border p-6 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
          </div>

          <div className="text-4xl font-bold mb-3">
            -{formatCurrency(lastCompletedTransfer.amount)} đ
          </div>

          <div className="text-emerald-600 font-semibold mb-6">
            Thành công
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/user/transfer"
              className="bg-[#1a365d] text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              Chuyển tiếp
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/user"
              className="border py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              Về trang chủ
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-2xl border p-6 space-y-4">
          <Row label="Người nhận" value={lastCompletedTransfer.recipientName} />

          <RowCopy
            label="Số tài khoản"
            value={lastCompletedTransfer.toAccount}
            copiedField={copiedField}
            onCopy={handleCopy}
            field="account"
          />

          <Row label="Ngân hàng" value={lastCompletedTransfer.recipientBank} />

          {dateObj && (
            <Row
              label="Thời gian"
              value={`${formattedTime} - ${formattedDate}`}
            />
          )}

          <Row label="Nội dung" value={lastCompletedTransfer.note || 'Chuyển tiền'} />

          {lastCompletedTransfer.id && (
            <RowCopy
              label="Mã GD"
              value={String(lastCompletedTransfer.id)}
              copiedField={copiedField}
              onCopy={handleCopy}
              field="txn"
            />
          )}

          <Row label="Xác thực" value="Smart OTP" />

          <Link
            href="/user/history"
            className="block text-center mt-4 text-[#1a365d] font-semibold"
          >
            Xem lịch sử →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-slate-500">{label}</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
}

function RowCopy({
  label,
  value,
  copiedField,
  onCopy,
  field,
}: {
  label: string;
  value: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
  field: string;
}) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-slate-500">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono">{value}</span>
        <button onClick={() => onCopy(value, field)}>
          {copiedField === field ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
}