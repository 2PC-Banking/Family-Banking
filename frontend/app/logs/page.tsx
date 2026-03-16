"use client";

import { useState, useCallback } from 'react';
import { SystemStatus } from '@/components/dashboard/SystemStatus';
import { LogsHeader } from '@/components/logs/LogsHeader';
import { LogsList } from '@/components/logs/LogsList';
import { LogDetailModal } from '@/components/logs/LogDetailModal';
import { systemLogs } from '@/lib/mockData';

interface Log {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';
  source: string;
  message: string;
  transactionId: string | null;
}

export default function LogsPage() {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [displayedLogs, setDisplayedLogs] = useState<Log[]>(systemLogs);
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilteredDataChange = useCallback((data: Log[]) => {
    setDisplayedLogs(data);
  }, []);

  const handleExport = () => {
    const csv = [
      ['Log ID', 'Timestamp', 'Level', 'Source', 'Message', 'Transaction ID'],
      ...displayedLogs.map((log) => [
        log.id,
        log.timestamp,
        log.level,
        log.source,
        `"${log.message}"`,
        log.transactionId || '',
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system_logs_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <SystemStatus />

      <LogsHeader
        onExportClick={handleExport}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="px-8 py-6">
          <LogsList
            logs={systemLogs}
            onRowClick={setSelectedLog}
            onFilteredDataChange={handleFilteredDataChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {/* Log Detail Modal */}
      <LogDetailModal
        isOpen={selectedLog !== null}
        log={selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </div>
  );
}
