'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

// Mock credentials for demo
const DEMO_CREDENTIALS = {
  accountNumber: '0900000000',
  password: '123456',
};

export default function UserLoginPage() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock authentication check
      if (accountNumber === DEMO_CREDENTIALS.accountNumber && password === DEMO_CREDENTIALS.password) {
        router.push('/user');
      } else {
        setError('Số tài khoản hoặc mật khẩu không đúng. Thử: 0900000000 / 123456');
      }
    } catch {
      setError('Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 flex items-center justify-center p-4">
      {/* Left side - Illustration area */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="relative w-96 h-96">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl transform -rotate-6 opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-emerald-600 rounded-3xl transform rotate-3 opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-3xl backdrop-blur-sm">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#1a365d] mb-2">
                Heritage Digital
              </div>
              <p className="text-amber-600 text-sm font-semibold tracking-wider">THE SOVEREIGN TRUST</p>
              <p className="text-slate-500 text-base mt-4">Ngân hàng số của bạn</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Chào mừng trở lại</h1>
            <p className="text-slate-600 font-medium">Đăng nhập vào tài khoản của bạn</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Number */}
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-semibold text-slate-900 mb-2">
                Số tài khoản / Số điện thoại
              </label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Nhập số tài khoản hoặc số điện thoại"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-slate-900 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <p className="text-sm text-amber-700 font-medium">{error}</p>
              </div>
            )}

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700 font-medium">Ghi nhớ đăng nhập</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Quên mật khẩu?
              </a>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center text-sm text-slate-600">
            <p>
              {"Chưa có tài khoản? "}
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Đăng ký ngay
              </a>
            </p>
          </div>

          {/* Admin Login Link */}
          <div className="text-center pt-4 border-t border-slate-200">
            <Link 
              href="/admin/login"
              className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
            >
              Admin login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
