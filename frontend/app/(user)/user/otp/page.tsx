'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/lib/user-context';
import { api } from '@/lib/api';

const OTP_LENGTH = 6;
const COUNTDOWN_SECONDS = 120;

export default function OTPPage() {
  const router = useRouter();
  const {
    pendingTransfer,
    user,
    setLastCompletedTransfer,
  } = useUser();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const maskedAccount = user?.accountnumber
    ? `TK ${user.accountnumber.slice(0, 4)}****${user.accountnumber.slice(-2)}`
    : '';

  useEffect(() => {
    if (!pendingTransfer && !isVerifying) {
      router.replace('/user');
    }
  }, [pendingTransfer, isVerifying, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    setCanResend(true);
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];

    if (value.length > 1) {
      const digits = value.slice(0, OTP_LENGTH - index).split('');
      digits.forEach((digit, i) => {
        if (index + i < OTP_LENGTH) {
          newOtp[index + i] = digit;
        }
      });
      setOtp(newOtp);
      setError('');
      return;
    }

    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = async () => {
    try {
      if (!user) return;
      await api.requestOtp(user.accountnumber);
      setCountdown(COUNTDOWN_SECONDS);
      setCanResend(false);
      setOtp(Array(OTP_LENGTH).fill(''));
      setError('');
      inputRefs.current[0]?.focus();
    } catch {
      setError('Không gửi lại OTP được');
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');

    if (otpValue.length !== OTP_LENGTH) {
      setError('Vui lòng nhập đầy đủ mã OTP');
      return;
    }

    if (!pendingTransfer) return;

    try {
      setIsVerifying(true);
      setError('');

      const res = await api.transfer({
        fromAccount: pendingTransfer.fromAccount,
        toAccount: pendingTransfer.toAccount,
        amount: pendingTransfer.amount,
        note: pendingTransfer.note,
        otpCode: otpValue,
      });

      setLastCompletedTransfer({
        ...pendingTransfer,
        id: String(res.transactionId),
        timestamp: res.timestamp || new Date().toISOString(),
      });

      router.push('/user/success');
    } catch (err: any) {
      setError(err?.message || 'OTP không đúng');
      setOtp(Array(OTP_LENGTH).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (otp.every((d) => d !== '') && !isVerifying) {
      handleVerify();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  if (!pendingTransfer && !isVerifying) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">Nhập OTP</h2>
              <p className="text-sm text-slate-500">{maskedAccount}</p>
            </div>

            <div className="flex justify-center gap-3 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center border rounded-xl"
                />
              ))}
            </div>

            {error && (
              <p className="text-red-500 text-center text-sm mb-4">{error}</p>
            )}

            <div className="text-center text-sm mb-2">
              {formatCountdown(countdown)}
            </div>

            <button
              onClick={handleResend}
              disabled={!canResend}
              className="w-full mb-3 text-sm"
            >
              Gửi lại OTP
            </button>

            <button
              onClick={handleVerify}
              className="w-full bg-[#1a365d] text-white py-3 rounded-xl"
            >
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}