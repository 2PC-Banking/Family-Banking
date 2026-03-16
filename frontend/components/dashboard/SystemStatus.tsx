'use client';

import { useState, useEffect } from 'react';
import { getCurrentTime } from '@/lib/mockData';

export function SystemStatus() {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(getCurrentTime());
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-8 py-6 border-b border-slate-300 bg-gradient-to-r from-blue-50 via-slate-50 to-blue-50">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          FAMILY BANK
        </h1>
        <p className="text-slate-600 text-sm mt-1 font-medium">Management System</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-600 font-medium">System Status</p>
        <p className="text-lg font-semibold text-slate-900">{currentTime}</p>
      </div>
    </div>
  );
}
