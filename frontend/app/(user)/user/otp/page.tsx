'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import { VALID_OTP } from '@/lib/user-mock-data';
import { ArrowLeft, Smartphone, Clock, RefreshCw } from 'lucide-react';

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 120;

export default function OTPPage() {
  const router = useRouter();
  const { pendingTransfer, completeTransfer, user } = useUser();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const [isNavigatingToSuccess, setIsNavigatingToSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const defaultAccount = user.accounts.find((acc) => acc.isDefault) || user.accounts[0];
  const maskedAccount = `TK ${defaultAccount.accountNumber.slice(0, 4)}****${defaultAccount.accountNumber.slice(-2)}`;

  // Redirect if no pending transfer (only if not navigating to success)
  useEffect(() => {
    if (!pendingTransfer && !isNavigatingToSuccess) {
      router.replace('/user/transfer');
    }
  }, [pendingTransfer, router, isNavigatingToSuccess]);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    
    // Handle paste
    if (value.length > 1) {
      const digits = value.slice(0, OTP_LENGTH - index).split('');
      digits.forEach((digit, i) => {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + digits.length, OTP_LENGTH - 1);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Move to next input
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(COUNTDOWN_SECONDS);
    setCanResend(false);
    setOtp(Array(OTP_LENGTH).fill(''));
    setError('');
    inputRefs.current[0]?.focus();
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    
    if (otpValue.length !== OTP_LENGTH) {
      setError('Vui lòng nhập đầy đủ mã OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (otpValue === VALID_OTP) {
      setIsNavigatingToSuccess(true);
      completeTransfer();
      router.push('/user/success');
      return;
    } else {
      setError('Mã OTP không chính xác. Vui lòng thử lại.');
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    }

    setIsVerifying(false);
  };

  // Auto-verify when all digits entered
  useEffect(() => {
    if (otp.every((digit) => digit !== '') && !isVerifying) {
      handleVerify();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  if (!pendingTransfer) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/user/transfer"
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#1a365d]">Xác thực giao dịch</h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center">
                <Smartphone className="w-10 h-10 text-[#1a365d]" />
              </div>
            </div>

            {/* Message */}
            <div className="text-center mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Nhập mã xác thực</h2>
              <p className="text-slate-600">Mã OTP đã được gửi đến thiết bị của</p>
              <p className="font-bold text-[#1a365d] text-lg">{maskedAccount}</p>
            </div>

            {/* OTP Input */}
            <div className="mb-6">
              <div className="flex justify-center gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className={`w-12 h-14 text-center text-2xl font-bold border-2 rounded-xl outline-none transition-all ${
                      digit
                        ? 'border-[#1a365d] bg-blue-50'
                        : 'border-slate-200 bg-white'
                    } focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/10`}
                    disabled={isVerifying}
                  />
                ))}
              </div>

              {/* Error Message */}
              {error && (
                <p className="mt-4 text-center text-red-500 text-sm font-medium">{error}</p>
              )}
            </div>

            {/* Countdown & Resend */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
                <Clock className="w-4 h-4" />
                <span className="font-mono font-medium">{formatCountdown(countdown)}</span>
              </div>
              
              <button
                onClick={handleResend}
                disabled={!canResend}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  canResend
                    ? 'text-[#1a365d] hover:bg-blue-50'
                    : 'text-slate-400 cursor-not-allowed'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                Gửi lại mã
              </button>
            </div>

            {/* Loading state */}
            {isVerifying && (
              <div className="mt-6 flex items-center justify-center gap-2 text-[#1a365d]">
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="font-medium">Đang xác thực...</span>
              </div>
            )}

            {/* Help Text */}
            <p className="text-center text-sm text-slate-500 mt-6 pt-6 border-t border-slate-100">
              Mã OTP thử nghiệm: <span className="font-mono font-bold text-[#1a365d]">123456</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
