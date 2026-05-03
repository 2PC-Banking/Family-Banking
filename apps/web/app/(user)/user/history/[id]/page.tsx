'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/lib/user-context';
import { api, TransactionItem } from '@/lib/api';
import { ArrowLeft, Copy, Check } from 'lucide-react';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN').format(Math.abs(value));
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString('vi-VN');
}

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { user, isReady } = useUser();

  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;

    if (!user) {
      router.push('/login');
      return;
    }

    const loadHistory = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await api.getHistory(user.accountnumber);
        setTransactions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không tải được chi tiết giao dịch');
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [user, isReady, router]);

  const transaction = useMemo(() => {
    return transactions.find((tx) => tx.transactionid === params.id);
  }, [transactions, params.id]);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!isReady) return null;
  if (!user) return null;

  if (loading) {
    return <div className="p-6 text-center text-slate-500">Đang tải...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  if (!transaction) {
    return <div className="p-6 text-center text-slate-500">Không tìm thấy giao dịch</div>;
  }

  const isIncoming = transaction.amount > 0;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/user/history"
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-[#1a365d]">Chi tiết giao dịch</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div className="text-center pb-6 border-b border-slate-100">
            <div className={`text-4xl font-bold ${isIncoming ? 'text-emerald-600' : 'text-slate-900'}`}>
              {isIncoming ? '+' : '-'}
              {formatCurrency(transaction.amount)} đ
            </div>
            <div className="mt-2 text-sm text-emerald-600 font-semibold">Thành công</div>
          </div>

          <Row
            label="Loại giao dịch"
            value={isIncoming ? 'Nhận tiền' : 'Chuyển tiền'}
          />

          <Row
            label={isIncoming ? 'Từ tài khoản' : 'Đến tài khoản'}
            value={transaction.relatedaccount || '---'}
          />

          <Row label="Thời gian" value={formatDateTime(transaction.timestamp)} />

          <RowCopy
            label="Mã giao dịch"
            value={transaction.transactionid}
            copiedField={copiedField}
            onCopy={handleCopy}
            field="txn"
          />

          <Row label="Loại backend" value={transaction.type || '---'} />

          <Row label="Số dư sau GD" value={`${formatCurrency(transaction.postbalance)} đ`} />

          <RowCopy
            label="Số tài khoản nguồn"
            value={transaction.accountnumber}
            copiedField={copiedField}
            onCopy={handleCopy}
            field="account"
          />
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500 shrink-0">{label}</span>
      <span className="font-semibold text-slate-900 text-right">{value}</span>
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
    <div className="flex justify-between gap-4 items-center">
      <span className="text-slate-500 shrink-0">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono font-semibold text-slate-900 text-right">{value}</span>
        <button
          onClick={() => onCopy(value, field)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {copiedField === field ? (
            <Check className="w-4 h-4 text-emerald-500" />
          ) : (
            <Copy className="w-4 h-4 text-slate-400" />
          )}
        </button>
      </div>
    </div>
  );
}