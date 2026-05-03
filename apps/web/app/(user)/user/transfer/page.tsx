'use client';

import { api } from '@/lib/api';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { formatCurrency, bankOptions } from '@/lib/user-mock-data';
import {
  ArrowLeft,
  ChevronDown,
  Building2,
  Grid3X3,
  BadgeCheck,
  Check,
} from 'lucide-react';

const quickAmounts = [500000, 1000000, 5000000];

export default function TransferPage() {
  const router = useRouter();
  const { user, setPendingTransfer } = useUser();
  if (!user) return null;
  const defaultAccount = {
    accountNumber: user.accountnumber,
  };

  const [selectedBank, setSelectedBank] = useState(bankOptions[0]);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [balance, setBalance] = useState(0);

  // Auto-lookup recipient name
  useEffect(() => {
    if (accountNumber.length >= 10) {
      setIsVerifying(true);
      setIsVerified(false);
      setRecipientName('');

      // CHẶN CHUYỂN CHO CHÍNH MÌNH
      if (accountNumber === user.accountnumber) {
        setRecipientName('');
        setIsVerified(false);
        setIsVerifying(false);

        setErrors((prev) => ({
          ...prev,
          recipient: 'Không thể chuyển tiền cho chính tài khoản của bạn',
        }));

        return;
      }

      const timeout = setTimeout(async () => {
        try {
          const res = await api.getAccountInfo(accountNumber);
          setRecipientName(res.customerName);
          setIsVerified(true);

          // clear lỗi nếu trước đó có
          setErrors((prev) => ({
            ...prev,
            recipient: '',
          }));
        } catch (err) {
          setRecipientName('');
          setIsVerified(false);
        } finally {
          setIsVerifying(false);
        }
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      setRecipientName('');
      setIsVerified(false);
    }
  }, [accountNumber]);

  useEffect(() => {
    if (!user.accountnumber) return;

    const fetchBalance = async () => {
      try {
        const res = await api.getBalance(user.accountnumber);
        setBalance(res.balance);
      } catch (err) {
        console.error('Lỗi lấy số dư:', err);
      }
    };

    fetchBalance();
  }, [user]);

  const handleAmountChange = (value: string) => {
    // Only allow numbers
    const numericValue = value.replace(/\D/g, '');
    setAmount(numericValue);
  };

  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!accountNumber || accountNumber.length < 10) {
      newErrors.accountNumber = 'Vui lòng nhập số tài khoản hợp lệ';
    }
    if (accountNumber === user.accountnumber) {
      newErrors.recipient = 'Không thể chuyển tiền cho chính tài khoản của bạn';
    }
    if (!isVerified) {
      newErrors.recipient = 'Không tìm thấy thông tin người nhận';
    }
    if (!amount || parseInt(amount) < 1000) {
      newErrors.amount = 'Số tiền tối thiểu là 1,000 VND';
    }
    if (parseInt(amount) > balance) {
      newErrors.amount = 'Số dư không đủ để thực hiện giao dịch';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await api.requestOtp(defaultAccount.accountNumber);

      setPendingTransfer({
        fromAccount: defaultAccount.accountNumber,
        toAccount: accountNumber,
        recipientName: recipientName,
        recipientBank: selectedBank.name,
        amount: parseInt(amount),
        note: note || 'Chuyen tien',
      });

      router.push('/user/otp');
    } catch (err) {
      alert('Không gửi được OTP');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/user"
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#1a365d]">Chuyển tiền</h1>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Source Account Card */}
          <div className="bg-gradient-to-br from-[#1a365d] to-[#2d4a7c] rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-blue-200 tracking-wider">TÀI KHOẢN NGUỒN</span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium">DEFAULT</span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xl font-bold font-mono">{defaultAccount.accountNumber}</p>
                <p className="text-sm text-blue-200">{user.name}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{formatCurrency(balance)} <span className="text-base text-blue-200">đ</span></p>
                <p className="text-sm text-blue-200">Khả dụng</p>
              </div>
            </div>
          </div>

          {/* Transfer Form */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
            {/* Bank Selection */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 tracking-wider mb-2">
                NGÂN HÀNG THỤ HƯỞNG
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowBankDropdown(!showBankDropdown)}
                  className="w-full flex items-center justify-between px-4 py-3 border border-slate-200 rounded-xl hover:border-slate-300 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-slate-400" />
                    <span className="font-medium text-slate-900">{selectedBank.name}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showBankDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showBankDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-10 max-h-64 overflow-auto">
                    {bankOptions.map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => {
                          setSelectedBank(bank);
                          setShowBankDropdown(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left transition-colors"
                      >
                        <Building2 className="w-5 h-5 text-slate-400" />
                        <span className="font-medium text-slate-900">{bank.name}</span>
                        {selectedBank.id === bank.id && (
                          <Check className="w-4 h-4 text-emerald-500 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Account Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 tracking-wider mb-2">
                SỐ TÀI KHOẢN
              </label>
              <div className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-xl focus-within:border-[#1a365d] focus-within:ring-2 focus-within:ring-[#1a365d]/10 transition-all">
                <Grid3X3 className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => {
                    setAccountNumber(e.target.value.replace(/\D/g, ''));
                    setErrors((prev) => ({ ...prev, accountNumber: '', recipient: '' }));
                  }}
                  placeholder="Nhập số tài khoản người nhận"
                  className="flex-1 outline-none text-slate-900 font-medium placeholder:text-slate-400"
                />
              </div>
              {errors.accountNumber && (
                <p className="mt-1 text-sm text-red-500">{errors.accountNumber}</p>
              )}
            </div>

            {/* Recipient Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 tracking-wider mb-2">
                TÊN NGƯỜI NHẬN
              </label>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isVerified 
                  ? 'bg-emerald-50 border border-emerald-200' 
                  : 'bg-slate-50 border border-slate-200'
              }`}>
                {isVerified && <BadgeCheck className="w-5 h-5 text-emerald-500" />}
                <span className={`font-bold ${isVerified ? 'text-[#1a365d]' : 'text-slate-400'}`}>
                  {isVerifying ? 'Đang xác minh...' : recipientName || 'Tự động hiển thị sau khi nhập STK'}
                </span>
              </div>
              {errors.recipient && (
                <p className="mt-1 text-sm text-red-500">{errors.recipient}</p>
              )}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 tracking-wider mb-2">
                SỐ TIỀN CHUYỂN
              </label>
              <div className="flex items-center gap-3 px-4 py-3 border-b-2 border-[#1a365d]">
                <input
                  type="text"
                  value={amount ? formatCurrency(parseInt(amount)) : ''}
                  onChange={(e) => handleAmountChange(e.target.value.replace(/\./g, ''))}
                  placeholder="0"
                  className="flex-1 outline-none text-3xl font-bold text-slate-900 placeholder:text-slate-300"
                />
                <span className="text-xl text-slate-400 font-medium">VND</span>
              </div>
              {errors.amount && (
                <p className="mt-1 text-sm text-red-500">{errors.amount}</p>
              )}
              
              {/* Quick amounts */}
              <div className="flex gap-2 mt-3">
                {quickAmounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleQuickAmount(value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      amount === value.toString()
                        ? 'bg-[#1a365d] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {formatCurrency(value)}
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 tracking-wider mb-2">
                NỘI DUNG
              </label>
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nội dung chuyển tiền"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/10 outline-none transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isVerified || !amount}
            className="w-full py-4 bg-[#1a365d] hover:bg-[#2d4a7c] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Tiếp tục
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
