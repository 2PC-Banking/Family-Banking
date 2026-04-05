'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/lib/user-context';
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Smartphone,
  CreditCard,
  HelpCircle,
  FileText,
  LogOut,
  ChevronRight,
  Shield,
  Eye,
  EyeOff,
  Globe,
} from 'lucide-react';

export default function SettingsPage() {
  const { user } = useUser();
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  const defaultAccount = user.accounts.find((acc) => acc.isDefault) || user.accounts[0];

  const settingsSections = [
    {
      title: 'Tài khoản',
      items: [
        {
          icon: User,
          label: 'Thông tin cá nhân',
          description: 'Họ tên, email, số điện thoại',
          href: '#',
          comingSoon: true,
        },
        {
          icon: CreditCard,
          label: 'Quản lý tài khoản',
          description: 'Tài khoản ngân hàng liên kết',
          href: '#',
          comingSoon: true,
        },
        {
          icon: Lock,
          label: 'Đổi mật khẩu',
          description: 'Cập nhật mật khẩu đăng nhập',
          href: '#',
          comingSoon: true,
        },
      ],
    },
    {
      title: 'Bảo mật',
      items: [
        {
          icon: Shield,
          label: 'Smart OTP',
          description: 'Quản lý thiết bị xác thực',
          href: '#',
          comingSoon: true,
        },
        {
          icon: Smartphone,
          label: 'Thiết bị đăng nhập',
          description: 'Quản lý các thiết bị đã đăng nhập',
          href: '#',
          comingSoon: true,
        },
      ],
    },
    {
      title: 'Tùy chọn',
      items: [
        {
          icon: Bell,
          label: 'Thông báo',
          description: 'Cài đặt thông báo giao dịch',
          href: '#',
          comingSoon: true,
        },
        {
          icon: Globe,
          label: 'Ngôn ngữ',
          description: 'Tiếng Việt',
          href: '#',
          comingSoon: true,
        },
      ],
    },
    {
      title: 'Hỗ trợ',
      items: [
        {
          icon: HelpCircle,
          label: 'Trung tâm trợ giúp',
          description: 'Câu hỏi thường gặp',
          href: '#',
          comingSoon: true,
        },
        {
          icon: FileText,
          label: 'Điều khoản sử dụng',
          description: 'Chính sách và điều khoản',
          href: '#',
          comingSoon: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/user"
              className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-[#1a365d]">Cài đặt</h1>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Profile */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1a365d] to-[#2d4a7c] rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-2xl">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-1">{user.name}</h2>
                <p className="text-sm text-slate-500">ID: {user.id}</p>
                <p className="text-sm text-slate-500">{user.phone}</p>
              </div>

              {/* Account Info */}
              <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-500 tracking-wider mb-1">TÀI KHOẢN MẶC ĐỊNH</p>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-[#1a365d]">
                        {showAccountNumber 
                          ? defaultAccount.accountNumber 
                          : `${defaultAccount.accountNumber.slice(0, 4)}****${defaultAccount.accountNumber.slice(-2)}`
                        }
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAccountNumber(!showAccountNumber)}
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors"
                  >
                    {showAccountNumber ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Logout Button */}
            <Link
              href="/login"
              className="flex items-center justify-center gap-3 w-full py-4 bg-red-50 hover:bg-red-100 text-red-600 font-bold rounded-xl transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Đăng xuất
            </Link>

            {/* Version Info */}
            <div className="text-center py-4">
              <p className="text-sm text-slate-400">Heritage Digital Bank</p>
              <p className="text-xs text-slate-400">Phiên bản 1.0.0 (Demo)</p>
            </div>
          </div>

          {/* Right Column - Settings Sections */}
          <div className="lg:col-span-2 space-y-6">
            {settingsSections.map((section) => (
              <div key={section.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">{section.title}</h3>
                </div>
                <div className="divide-y divide-slate-100">
                  {section.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) => item.comingSoon && e.preventDefault()}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-[#1a365d]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{item.label}</p>
                        <p className="text-sm text-slate-500">{item.description}</p>
                      </div>
                      {item.comingSoon ? (
                        <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full">
                          Sắp ra mắt
                        </span>
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
