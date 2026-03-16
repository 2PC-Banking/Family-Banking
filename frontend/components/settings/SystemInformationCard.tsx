'use client';

import { useState, useEffect } from 'react';
import { getCurrentTime } from '@/lib/mockData';

interface SystemInfo {
  coordinatorStatus: string;
  connectedNodes: number;
  databaseStatus: string;
  lastRecovery: string;
}

interface SystemInformationCardProps {
  info?: SystemInfo;
}

const defaultInfo: SystemInfo = {
  coordinatorStatus: 'Running',
  connectedNodes: 4,
  databaseStatus: 'Connected',
  lastRecovery: '2024-02-06 10:30:00',
};

export function SystemInformationCard({ info = defaultInfo }: SystemInformationCardProps) {
  const [displayInfo, setDisplayInfo] = useState(info);

  useEffect(() => {
    setDisplayInfo(info);
  }, [info]);

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h2 className="text-xl font-semibold text-slate-900 mb-6">System Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Coordinator Service</p>
          <p className="text-lg font-semibold text-slate-900 mt-2">{displayInfo.coordinatorStatus}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Connected Participant Nodes</p>
          <p className="text-lg font-semibold text-slate-900 mt-2">{displayInfo.connectedNodes}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Database Status</p>
          <p className="text-lg font-semibold text-slate-900 mt-2">{displayInfo.databaseStatus}</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <p className="text-sm text-slate-600 font-medium">Last Recovery Event</p>
          <p className="text-lg font-semibold text-slate-900 mt-2">{displayInfo.lastRecovery}</p>
        </div>
      </div>
    </div>
  );
}
