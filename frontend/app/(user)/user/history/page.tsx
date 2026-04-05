'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { formatCurrency, formatDateTime, Transaction } from '@/lib/user-mock-data';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  ArrowUpRight,
  ArrowDownLeft,
  Receipt,
  Smartphone,
  ChevronDown,
  Calendar,
} from 'lucide-react';

type FilterType = 'all' | 'transfer_out' | 'transfer_in' | 'bill_payment' | 'deposit';

const filterOptions: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Tất cả' },
  { value: 'transfer_out', label: 'Chuyển tiền' },
  { value: 'bill_payment', label: 'Thanh toán hóa đơn' },
  { value: 'transfer_in', label: 'Nhận tiền' },
  { value: 'deposit', label: 'Nạp tiền' },
];

function getTransactionIcon(type: Transaction['type']) {
  switch (type) {
    case 'transfer_out':
      return { icon: ArrowUpRight, bg: 'bg-blue-100', color: 'text-blue-600' };
    case 'transfer_in':
      return { icon: ArrowDownLeft, bg: 'bg-emerald-100', color: 'text-emerald-600' };
    case 'bill_payment':
      return { icon: Receipt, bg: 'bg-amber-100', color: 'text-amber-600' };
    case 'deposit':
      return { icon: Smartphone, bg: 'bg-purple-100', color: 'text-purple-600' };
    default:
      return { icon: ArrowUpRight, bg: 'bg-slate-100', color: 'text-slate-600' };
  }
}

function getTransactionTitle(tx: Transaction) {
  switch (tx.type) {
    case 'transfer_out':
      return `Chuyển đến: ${tx.recipientAccount}`;
    case 'transfer_in':
      return `Nhận từ: ${tx.senderAccount}`;
    case 'bill_payment':
      return `Thanh toán: ${tx.recipientName}`;
    case 'deposit':
      return 'Nạp tiền vào tài khoản';
    default:
      return tx.description;
  }
}

export default function HistoryPage() {
  const { transactions } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Filter by type
      if (activeFilter !== 'all' && tx.type !== activeFilter) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableFields = [
          tx.id,
          tx.recipientAccount,
          tx.recipientName,
          tx.senderAccount,
          tx.senderName,
          tx.note,
          tx.description,
        ].filter(Boolean);
        
        return searchableFields.some((field) => 
          field?.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [transactions, activeFilter, searchQuery]);

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    
    filteredTransactions.forEach((tx) => {
      const date = new Date(tx.timestamp).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(tx);
    });

    return groups;
  }, [filteredTransactions]);

  // Calculate summary
  const summary = useMemo(() => {
    const totalIn = filteredTransactions
      .filter(tx => tx.amount > 0)
      .reduce((sum, tx) => sum + tx.amount, 0);
    const totalOut = filteredTransactions
      .filter(tx => tx.amount < 0)
      .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    return { totalIn, totalOut, count: filteredTransactions.length };
  }, [filteredTransactions]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/user"
                className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-xl font-bold text-[#1a365d]">Lịch sử giao dịch</h1>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg transition-colors ${
                showFilters ? 'bg-[#1a365d] text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters & Summary */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/10 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Filter Options */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm">Loại giao dịch</h3>
              </div>
              <div className="p-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter.value}
                    onClick={() => setActiveFilter(filter.value)}
                    className={`w-full px-4 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                      activeFilter === filter.value
                        ? 'bg-[#1a365d] text-white'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">Tổng quan</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Số giao dịch</span>
                  <span className="font-bold text-slate-900">{summary.count}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Tổng nhận</span>
                  <span className="font-bold text-emerald-600">+{formatCurrency(summary.totalIn)} đ</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-500">Tổng chi</span>
                  <span className="font-bold text-slate-900">-{formatCurrency(summary.totalOut)} đ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Transactions List */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Chips */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {filterOptions.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter.value
                      ? 'bg-[#1a365d] text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Transactions List */}
            {Object.keys(groupedTransactions).length > 0 ? (
              <div className="space-y-6">
                {Object.entries(groupedTransactions).map(([date, txs]) => (
                  <div key={date}>
                    <div className="flex items-center gap-2 mb-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <h3 className="text-sm font-semibold text-slate-500">
                        {date}
                      </h3>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                      {txs.map((tx) => {
                        const iconConfig = getTransactionIcon(tx.type);
                        const Icon = iconConfig.icon;
                        
                        return (
                          <Link
                            key={tx.id}
                            href={`/user/history/${tx.id}`}
                            className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors"
                          >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${iconConfig.bg}`}>
                              <Icon className={`w-5 h-5 ${iconConfig.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-slate-900 truncate">
                                {getTransactionTitle(tx)}
                              </p>
                              <p className="text-sm text-slate-500 truncate">
                                {tx.description} - {formatDateTime(tx.timestamp)}
                              </p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <p className={`font-bold ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                                {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)} đ
                              </p>
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                tx.status === 'success'
                                  ? 'bg-emerald-100 text-emerald-700'
                                  : tx.status === 'pending'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {tx.status === 'success' ? 'Thành công' : tx.status === 'pending' ? 'Đang xử lý' : 'Thất bại'}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Không có giao dịch</h3>
                <p className="text-sm text-slate-500">
                  {searchQuery
                    ? 'Không tìm thấy giao dịch phù hợp với từ khóa tìm kiếm'
                    : 'Chưa có giao dịch nào trong danh mục này'}
                </p>
              </div>
            )}

            {/* Load More Button */}
            {filteredTransactions.length > 0 && (
              <button className="w-full mt-6 py-3 text-[#1a365d] font-medium hover:bg-white rounded-xl transition-colors flex items-center justify-center gap-2">
                Xem thêm giao dịch cũ hơn
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
