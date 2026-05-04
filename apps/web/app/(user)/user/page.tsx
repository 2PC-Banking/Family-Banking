'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/user-context';
import { api, TransactionItem } from '@/lib/api';
import {
  Eye,
  EyeOff,
  Copy,
  Check,
  Send,
  FileText,
  Smartphone,
  PiggyBank,
  Gift,
  Shield,
  Headphones,
  QrCode,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  ChevronRight,
} from 'lucide-react';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('vi-VN').format(Math.abs(value));
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString('vi-VN');
}

export default function UserDashboard() {
  const router = useRouter();
  const { user, isReady } = useUser();

  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isReady) return;

    if (!user) {
      router.push('/login');
      return;
    }
    

    const loadDashboardData = async () => {
      try {
        setLoading(true);
        setError('');

        const [balanceRes, historyRes] = await Promise.all([
          api.getBalance(user.accountnumber),
          api.getHistory(user.accountnumber),
        ]);

        console.log('balanceRes:', balanceRes);

        setBalance(balanceRes.balance);
        setTransactions(historyRes);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Không tải được dữ liệu dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [user, isReady, router]);

  const recentTransactions = useMemo(() => transactions.slice(0, 4), [transactions]);

  const handleCopyAccount = async () => {
    if (!user) return;
    await navigator.clipboard.writeText(user.accountnumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!user) return null;

  const quickActions = [
    { icon: Send, label: 'Chuyển tiền', href: '/user/transfer', color: 'bg-blue-100 text-blue-600' },
    { icon: Clock, label: 'Lịch sử', href: '/user/history', color: 'bg-emerald-100 text-emerald-600' },
    { icon: FileText, label: 'Hóa đơn', href: '#', color: 'bg-amber-100 text-amber-600', comingSoon: true },
    { icon: Smartphone, label: 'Nạp tiền', href: '#', color: 'bg-purple-100 text-purple-600', comingSoon: true },
  ];

  const extraFeatures = [
    { icon: PiggyBank, label: 'Tiết kiệm', href: '#', comingSoon: true },
    { icon: Gift, label: 'Điểm thưởng', href: '#', points: 2450, comingSoon: true },
    { icon: Shield, label: 'Smart OTP', href: '#', status: 'Đang kích hoạt', comingSoon: true },
    { icon: QrCode, label: 'Quét QR', href: '#', comingSoon: true },
    { icon: Headphones, label: 'Hỗ trợ 24/7', href: '#', comingSoon: true },
  ];

  const displayedBalance = balance;

  if (!isReady) return null;
  if (!user) return null;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {error && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Welcome & Account Card */}
          <div className="bg-gradient-to-br from-[#1a365d] to-[#2d4a7c] rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute right-12 bottom-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-blue-200 text-sm">Xin chào,</p>
                  <h1 className="text-xl font-bold">{user.name}</h1>
                </div>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                </button>
              </div>

              <div className="mb-6">
                <p className="text-blue-200 text-sm mb-1">Số dư khả dụng</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">
                    {loading ? 'Đang tải...' : showBalance ? formatCurrency(displayedBalance) : '••••••••'}
                  </span>
                  {!loading && <span className="text-blue-200">VND</span>}
                </div>
              </div>

              <div className="flex items-center justify-between bg-white/10 rounded-xl p-4">
                <div>
                  <p className="text-blue-200 text-xs mb-1">SỐ TÀI KHOẢN</p>
                  <p className="font-mono text-lg font-semibold">{user.accountnumber}</p>
                </div>
                <button
                  onClick={handleCopyAccount}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                  title="Sao chép"
                >
                  {copied ? <Check className="w-5 h-5 text-emerald-400" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>

              <Link
                href="/user/history"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
              >
                <Clock className="w-4 h-4" />
                LỊCH SỬ
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-900">Dịch vụ nhanh</h2>
              <Link href="#" className="text-sm text-[#1a365d] font-medium hover:underline">
                Tất cả
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="group flex flex-col items-center gap-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
                  onClick={(e) => action.comingSoon && e.preventDefault()}
                >
                  <div className={`w-14 h-14 rounded-full ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-slate-700 text-center">{action.label}</span>
                  {action.comingSoon && <span className="text-xs text-slate-400">Đang phát triển</span>}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Giao dịch gần đây</h2>
              <Link
                href="/user/history"
                className="text-sm text-[#1a365d] font-medium hover:underline flex items-center gap-1"
              >
                Xem tất cả
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {loading ? (
              <div className="p-4 text-sm text-slate-500">Đang tải giao dịch...</div>
            ) : recentTransactions.length === 0 ? (
              <div className="p-4 text-sm text-slate-500">Chưa có giao dịch nào.</div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentTransactions.map((tx) => (
                  <Link
                    key={tx.transactionid}
                    href={`/user/history/${tx.transactionid}`}
                    className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        tx.amount > 0 ? 'bg-emerald-100' : 'bg-blue-100'
                      }`}
                    >
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <ArrowUpRight className="w-5 h-5 text-blue-600" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-900 truncate">
                        {tx.amount > 0
                          ? `Nhận từ: ${tx.relatedaccount || '---'}`
                          : `Chuyển đến: ${tx.relatedaccount || '---'}`}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {tx.transactionid} • {formatDateTime(tx.timestamp)}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {tx.amount > 0 ? '+' : '-'}
                        {formatCurrency(tx.amount)} đ
                      </p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
                        Thành công
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Extra Features */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <Link href="#" className="flex items-center gap-4 group" onClick={(e) => e.preventDefault()}>
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                <Gift className="w-7 h-7 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900 group-hover:text-[#1a365d] transition-colors">
                  Điểm thưởng Heritage
                </p>
                <p className="text-sm text-slate-500">2,450 points</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#1a365d] transition-colors" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <h3 className="font-bold text-slate-900 mb-4">Tiện ích khác</h3>
            <div className="grid grid-cols-2 gap-3">
              {extraFeatures.map((feature) => (
                <Link
                  key={feature.label}
                  href={feature.href}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors group"
                  onClick={(e) => feature.comingSoon && e.preventDefault()}
                >
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                    <feature.icon className="w-5 h-5 text-[#1a365d]" />
                  </div>
                  <span className="text-xs font-medium text-slate-700 text-center">{feature.label}</span>
                  {feature.comingSoon && <span className="text-xs text-slate-400">Sắp ra mắt</span>}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold">Hỗ trợ 24/7</p>
                <p className="text-sm text-emerald-100">Gặp chuyên viên tư vấn</p>
              </div>
            </div>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
              Liên hệ ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}