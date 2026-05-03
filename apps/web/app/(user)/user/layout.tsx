'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserProvider } from '@/lib/user-context';
import { Bell, User, LogOut, Home, History, Settings } from 'lucide-react';

const navItems = [
  { href: '/user', label: 'Trang chủ', icon: Home },
  { href: '/user/history', label: 'Lịch sử', icon: History },
  { href: '/user/settings', label: 'Cài đặt', icon: Settings },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <UserProvider>
      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/user" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#1a365d] to-[#2d4a7c] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm">HD</span>
                </div>
                <div className="hidden sm:block">
                  <div className="font-bold text-[#1a365d] text-lg leading-tight">Heritage Digital</div>
                  <div className="text-xs text-amber-600 font-medium tracking-wider">THE SOVEREIGN TRUST</div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== '/user' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#1a365d]/10 text-[#1a365d]'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              {/* Right side actions */}
              <div className="flex items-center gap-2">
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
                <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                  <User className="w-5 h-5" />
                </button>
                <Link
                  href="/login"
                  className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-slate-100">
            <div className="flex justify-around py-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href || 
                  (item.href !== '/user' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'text-[#1a365d]'
                        : 'text-slate-500'
                    }`}
                  >
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-[#1a365d]' : ''}`} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </UserProvider>
  );
}
