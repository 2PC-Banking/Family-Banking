'use client';

import { SystemStatus } from '@/components/dashboard/SystemStatus';
import { StatCards } from '@/components/dashboard/StatCards';
import { TransactionVolumeChart } from '@/components/dashboard/TransactionVolumeChart';
import { SuccessRateTrendChart } from '@/components/dashboard/SuccessRateTrendChart';
import { LinkedBanksStatus } from '@/components/dashboard/LinkedBanksStatus';
import {
  transactionVolumeData,
  successRateTrendData,
  linkedBanksData,
  dashboardStatsData,
} from '@/lib/mockData';

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-full">
      {/* System Status Header */}
      <SystemStatus />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Stat Cards */}
        <StatCards data={dashboardStatsData} />

        {/* Charts Section */}
        <div className="px-8 py-6 grid grid-cols-2 gap-6">
          <TransactionVolumeChart data={transactionVolumeData} />
          <SuccessRateTrendChart data={successRateTrendData} />
        </div>

        {/* Linked Banks Status */}
        <LinkedBanksStatus banks={linkedBanksData} />
      </div>
    </div>
  );
}
