'use client';

import { useAuth } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';
import { Sidebar } from './Sidebar';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const pathname = usePathname();
  
  // Don't show sidebar on login/verify pages or when not authenticated
  const isPublicPage = pathname.startsWith('/login') || pathname.startsWith('/verify');
  const shouldShowSidebar = isAuthenticated && !isPublicPage;

  return (
    <div className="flex h-screen bg-slate-50">
      {shouldShowSidebar && <Sidebar />}
      <main className={`flex-1 overflow-auto ${shouldShowSidebar ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
}
